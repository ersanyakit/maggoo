pragma solidity 0.8.20;

import {AssetType} from "../structs/Enums.sol";

library LibMarket {

    bytes32 internal constant STORAGE_SLOT = keccak256('storage.market.maggoo.io');


    struct BuyerInfo {
        address buyer;
        uint256 amount;
        uint256 price;
        uint256 bought_at;
    }

    struct TokenInfo {
        uint256 tokenId;
        bool is_sold;
    }

    struct MarketItemInfo {
        uint256 itemId;
        AssetType assetType;
        uint256 collectionId;
        address seller; // satıcı?
        address contract_address; // 721NFT ? 1155NFT (8 piyon 1155, 2 Kale 1155, 2 Fil: 1155, 2 At:1155, 1 Vezir ve 1 Şah 721 )
        uint256 tokenId;
        uint256 created_at; // created at
        uint256 price_per_token; // 2 eth
        uint256 amount; // 8 x 2 ETH
        uint256 remaining_amount; // 0; 

        //mapping(uint256 => BuyerInfo) buyers;
        uint256 currentBuyerIndex;

        bool is_completed;
        uint256 completed_at;

        bool is_cancelled;
        uint256 cancelled_at;

        bool is_exists;

        bool hasRoyalties;
        address royaltiesReceiver;
        uint256 royaltiesFee;
    }

    struct Collection{
        bool exists;
        bool banned;
        AssetType assetType;
        uint256 collectionId;
        uint256 created_at;
        uint256 totalVolume;
        address collection;
    }


    struct Layout {
        /// GameProvider? => itemIndex? => MarketItemInfo?
        /// AgeOfEmpires? -> 3 -> MarketItemInfo
        /// Satranc 8 Piyonu 3 Order -> MarketItemInfo 8 price = 2 ETH; *8 = 16

        Collection[] collections;

        // collectionId -> collectionDetails
        mapping(address => Collection) collectionInfo;

        //collectionId => marketItems
        mapping(uint256 => MarketItemInfo[]) marketItems;

        // publisherId -> ordeerId -> buyerIndex -> buyerInfo
        mapping(uint256 => mapping(uint256 => mapping(uint256 => BuyerInfo))) buyers;

        // publisherId -> orderId -> buyerIndex
        mapping(uint256 => mapping(uint256 => uint256)) buyerIndex;

    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }

}