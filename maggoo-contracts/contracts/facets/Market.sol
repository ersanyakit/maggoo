pragma solidity 0.8.20;

import {Modifiers} from "../libs/Modifiers.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ISolidStateERC1155} from "@solidstate/contracts/token/ERC1155/ISolidStateERC1155.sol";
import {ISolidStateERC721} from "@solidstate/contracts/token/ERC721/ISolidStateERC721.sol";
import {LibMarket} from "../libs/LibMarket.sol";
import {LibSettings} from "../libs/LibSettings.sol";
import {IWETH} from "../interfaces/IWETH.sol";
import {IMaggooNFT} from "../interfaces/IMaggooNFT.sol";

import "../structs/Errors.sol";
import {SellParam, BuyParam, CancelParam} from "../structs/Structs.sol";
import {AssetType} from "../structs/Enums.sol";

contract Market is Modifiers {
    using SafeMath for uint256;

    event SellItem(uint256 _collectionId, uint256 _itemId, address _contract, address _seller, uint256 _tokenId, uint256 _amount, uint256 _price);
    event BuyItem(uint256 _collectionId, uint256 _itemId, address _contract, address _seller, address _buyer, uint256 _tokenId, uint256 _amount, uint256 _price);
    event CancelItem(uint256 _collectionId, uint256 _itemId, address _contract, address _seller, uint256 _tokenId, uint256 _amount, uint256 _price);

    function addNewBuyer(uint256 _buyerIndex, uint256 _collectionId, uint256 _itemId, uint256 _price, uint256 _amount) internal {
        LibMarket.BuyerInfo storage buyerInfo = LibMarket.layout().buyers[_collectionId][_itemId][_buyerIndex];
        buyerInfo.buyer = msg.sender;
        buyerInfo.amount = _amount;
        buyerInfo.price = _price;
        buyerInfo.bought_at = block.timestamp;
    }

    function transferAssets(AssetType _type, address _contract, address _sender, address _receiver, uint256 _tokenId, uint256 _amount) internal {
        if (_type == AssetType.ERC1155) {
            ISolidStateERC1155(_contract).safeTransferFrom(_sender, _receiver, _tokenId, _amount, "");
        } else if (_type == AssetType.ERC721) {
            ISolidStateERC721(_contract).safeTransferFrom(_sender, _receiver, _tokenId);
        } else if (_type == AssetType.NATIVE) {
            IWETH(LibSettings.layout().WETH9).transfer(_receiver,_amount);
        }
    }

    function buy(BuyParam[] calldata _params, uint256 _totalPrice) external whenNotContract(msg.sender) nonReentrant whenNotPaused payable {
        uint256 itemsCount = _params.length;
        if (itemsCount == 0) {revert InvalidOrderAmount();}

        uint256 summaryPrice = 0;
        for (uint256 itemIndex = 0; itemIndex < itemsCount;) {
            BuyParam calldata item = _params[itemIndex];
            LibMarket.MarketItemInfo memory marketItem = LibMarket.layout().marketItems[item.collectionId][item.itemId];
            if (!marketItem.is_exists) {revert InvalidMarketItem();}
            if (marketItem.is_cancelled) {revert OrderIsCancelled();}
            if (marketItem.is_completed) {revert OrderIsAlreadyCompleted();}
            if (marketItem.seller == msg.sender) {revert InvalidBuyer(marketItem.seller, msg.sender);}
            if (item.amount > marketItem.remaining_amount) {revert InvalidAmount();}
            if (item.amount == 0) {revert InvalidAmount();}
            summaryPrice = summaryPrice.add(item.amount.mul(marketItem.price_per_token));

            unchecked{
                itemIndex++;
            }
        }

        if (summaryPrice != _totalPrice) {revert InvalidTotalPrice(_totalPrice, summaryPrice);}
        if (msg.value != summaryPrice) {revert InvalidBuyDepositAmount(summaryPrice, msg.value);}

        IWETH(LibSettings.layout().WETH9).deposit{value: msg.value}();
        handleBuy(_params);
    }

    function calculatePercent(uint256 amount, uint256 percent) internal pure returns (uint256){
        return percent > 0 ? amount.mul(percent).div(1e18) : 0;
    }

    function handleBuy(BuyParam[] calldata _params) internal {
        uint256 paramCount = _params.length;
        if (paramCount == 0) {revert InvalidOrderAmount();}
        LibMarket.Layout storage libMarket = LibMarket.layout();
        for (uint256 paramIndex = 0; paramIndex < paramCount;) {
            BuyParam calldata item = _params[paramIndex];
            LibMarket.MarketItemInfo storage marketItem = libMarket.marketItems[item.collectionId][item.itemId];
            if (marketItem.remaining_amount >= item.amount) {
                uint256 _buyerIndex = marketItem.currentBuyerIndex;
                marketItem.remaining_amount = marketItem.remaining_amount.sub(item.amount);
                marketItem.currentBuyerIndex = _buyerIndex.add(1);
                if (marketItem.remaining_amount == 0) {
                    marketItem.completed_at = block.timestamp;
                    marketItem.is_completed = true;
                    marketItem.is_exists = false;
                }

                uint256 totalPrice = marketItem.price_per_token.mul(item.amount);
                //transfer 1155 or 721 NFT
                transferAssets(marketItem.assetType, marketItem.contract_address, address(this), msg.sender, item.tokenId, item.amount);

                //totalPrice 1 eth -> 0.02 marketFee - 0.98
                uint256 marketFee = calculatePercent(totalPrice, LibSettings.layout().marketFee);
                if (marketFee > 0) {
                    // Check Calculate and Transfer fees
                    transferAssets(AssetType.NATIVE, address(0), address(this), LibSettings.layout().marketFeeReceiver, 0, marketFee);
                }

                uint256 royaltiesFee = 0;
                if((marketItem.hasRoyalties) && (marketItem.royaltiesReceiver != address(0)) && (marketItem.royaltiesFee > 0)){
                    royaltiesFee = (marketItem.royaltiesFee.div(marketItem.amount)).mul(item.amount);
                    if(royaltiesFee < totalPrice){
                        if(royaltiesFee > 0){
                            transferAssets(AssetType.NATIVE, address(0), address(this), marketItem.royaltiesReceiver, 0, royaltiesFee);
                        }
                    }else{
                        royaltiesFee = 0;
                    }
                }

                //transfer Earnings
                transferAssets(AssetType.NATIVE, address(0), address(this), marketItem.seller, 0, totalPrice.sub(marketFee).sub(royaltiesFee));
                uint256 totalVolume = libMarket.collectionInfo[marketItem.contract_address].totalVolume;
                totalVolume = totalVolume + totalPrice;
                libMarket.collections[marketItem.collectionId].totalVolume = totalVolume;
                libMarket.collectionInfo[marketItem.contract_address].totalVolume = totalVolume;

                addNewBuyer(_buyerIndex, marketItem.collectionId, marketItem.itemId, item.amount.mul(marketItem.price_per_token), item.amount);
                emit BuyItem(marketItem.collectionId, marketItem.itemId, marketItem.contract_address, marketItem.seller, msg.sender, item.tokenId, item.amount, totalPrice);
            } else {
                revert InvalidAmount();
            }

            unchecked{
                paramIndex++;
            }
        }
    }

    function sell(SellParam[] calldata _params) external whenNotContract(msg.sender) nonReentrant whenNotPaused{
        uint256 paramCount = _params.length;
        if (paramCount == 0) {revert InvalidOrderAmount();}

        for (uint256 paramIndex = 0; paramIndex < paramCount;) {
            SellParam calldata item = _params[paramIndex];
            address _contract = item.contractAddress;

            if (item.amount == 0) {revert InvalidAmount();}
            if (item.price == 0) {revert InvalidTotalPrice(0,1);}
            if(_contract == address(0)) {revert InvalidContractAddress();}
            if (item.assetType == AssetType.ERC1155) {
                if (!ISolidStateERC1155(_contract).isApprovedForAll(msg.sender, address(this))) {revert ApprovalRequired();}
                if (ISolidStateERC1155(_contract).balanceOf(msg.sender, item.tokenId) < item.amount) {revert MissingItemAmount();}
            } else if (item.assetType == AssetType.ERC721) {
                if (!ISolidStateERC721(_contract).isApprovedForAll(msg.sender, address(this))) {revert ApprovalRequired();}
                if (ISolidStateERC721(_contract).ownerOf(item.tokenId) != msg.sender) {revert MissingItemAmount();}
                if (item.amount > 1) {revert InvalidAmount();}
            } else {
                revert UnsupportedItemType();
            }
            transferAssets(item.assetType, _contract, msg.sender, address(this), item.tokenId, item.amount);

            unchecked{
                paramIndex++;
            }
        }
        handleSell(_params);
    }

    function handleSell(SellParam[] calldata _params) internal {
        uint256 paramCount = _params.length;
        LibMarket.Layout storage libMarket = LibMarket.layout();
        for (uint256 paramIndex = 0; paramIndex < paramCount;) {
            SellParam memory item = _params[paramIndex];
            LibMarket.Collection storage collectionInfo = libMarket.collectionInfo[item.contractAddress];
            if(!collectionInfo.exists){
                collectionInfo.assetType = item.assetType;
                collectionInfo.collectionId = libMarket.collections.length;
                collectionInfo.exists = true;
                collectionInfo.banned = false;
                collectionInfo.totalVolume = 0;
                collectionInfo.created_at = block.timestamp;
                collectionInfo.collection = item.contractAddress;
                libMarket.collections.push(collectionInfo);
            }

            uint256 _collectionId = collectionInfo.collectionId;
            uint256 _itemId = libMarket.marketItems[_collectionId].length;

            // check Balances;

            bool hasRoyalties = false;
            address royaltiesReceiver = address(0);
            uint256 royaltiesFee = 0;
            try IMaggooNFT(item.contractAddress).royaltyInfo(item.tokenId,item.price.mul(item.amount)) returns (
                address _royaltiesreceiver,uint256 _royaltiesFee
            ) {
                royaltiesReceiver = _royaltiesreceiver;
                royaltiesFee = _royaltiesFee;
                hasRoyalties = true;
            } catch {
                hasRoyalties = false;
                royaltiesReceiver = address(0);
                royaltiesFee = 0;
            }

            libMarket.marketItems[_collectionId].push(
            LibMarket.MarketItemInfo({
                itemId : _itemId,
                assetType : item.assetType,
                collectionId : _collectionId,
                seller : msg.sender,
                contract_address : item.contractAddress,
                tokenId : item.tokenId,
                created_at : block.timestamp,
                price_per_token : item.price,
                amount : item.amount,
                remaining_amount : item.amount,
                currentBuyerIndex:0,
                is_completed : false,
                completed_at : 0,
                is_cancelled : false,
                cancelled_at : 0,
                is_exists : true,
                hasRoyalties:hasRoyalties,
                royaltiesReceiver:royaltiesReceiver,
                royaltiesFee:royaltiesFee
                }));

            emit SellItem(_collectionId, _itemId, item.contractAddress, msg.sender, item.tokenId, item.amount, item.price);
            unchecked{
                paramIndex++;
            }
        }
    }

    function fetchCollections() external view returns(LibMarket.Collection[] memory){
        return LibMarket.layout().collections;
    }

    function fetch(uint256 _collectionId) external view returns (LibMarket.MarketItemInfo[] memory){
        return LibMarket.layout().marketItems[_collectionId];
    }

    function fetchItem(uint256 _collectionId, uint256 _itemId) external view returns(LibMarket.MarketItemInfo memory,LibMarket.Collection memory){
        return (LibMarket.layout().marketItems[_collectionId][_itemId],LibMarket.layout().collections[_collectionId]);
    }

    function cancel(CancelParam[] calldata _params) external whenNotContract(msg.sender) nonReentrant whenNotPaused {
        uint256 paramCount = _params.length;

        for (uint256 paramIndex = 0; paramIndex < paramCount;) {
            CancelParam memory item = _params[paramIndex];
            LibMarket.MarketItemInfo storage marketItem = LibMarket.layout().marketItems[item.collectionId][item.itemId];
            if (marketItem.seller != msg.sender) {revert InvalidMarketItemOwner();}
            if (marketItem.remaining_amount == 0) revert InvalidAction();
            if (marketItem.is_cancelled) revert OrderIsAlreadyCancelled(item.itemId);
            if (!marketItem.is_exists) {revert InvalidMarketItem();}
            marketItem.cancelled_at = block.timestamp;
            marketItem.is_cancelled = true;
            marketItem.is_exists = false;
            transferAssets(marketItem.assetType, marketItem.contract_address, address(this), marketItem.seller, marketItem.tokenId, marketItem.remaining_amount);
            marketItem.remaining_amount = 0;
            emit CancelItem(item.collectionId, item.itemId, marketItem.contract_address, msg.sender, marketItem.tokenId, marketItem.remaining_amount, marketItem.price_per_token);
            unchecked{
                paramIndex++;
            }
        }
    }
}