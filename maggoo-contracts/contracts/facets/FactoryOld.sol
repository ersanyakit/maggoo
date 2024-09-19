// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import "../structs/Structs.sol";
import "../libs/Modifiers.sol";
import "../libs/LibSettings.sol";
import "../structs/Errors.sol";
import "../libs/LibMaggoo.sol";
import "../libs/LibMerkleProof.sol";
import "../interfaces/IMaggooNFT.sol";
import "../libs/LibUintUtils.sol";
import "../interfaces/IKERC20.sol";
import "../interfaces/IDEX.sol";
import "../interfaces/IPAIR.sol";
import "../libs/TransferHelper.sol";
import "../interfaces/IChilizWrapper.sol";

contract FactoryOld is Modifiers {
    using LibUintUtils for uint256;


struct PairInfo {
        bool valid;
        uint reserve0;
        uint reserve1;
        uint amount0Out;
        uint amount1Out;
        uint token0Decimals;
        uint token1Decimals;
        IKERC20 token0;
        IKERC20 token1;
        IPAIR pair;
        address router;
        address weth;
    }

    struct PairInput{
        address router;
        address pair;
        address input;
        address weth;
        uint256 amount;
    }

function getRandomNumber(uint256 entryPoint, uint256 index, uint256 range) public view returns (uint256) {
    uint256 result;
    assembly {
        // Allocate memory for inputs
        let ptr := mload(0x40)

        // Store inputs in memory
        mstore(ptr, entryPoint)
        mstore(add(ptr, 0x20), index)

        // Load block.timestamp and block.number from Solidity context
        let ts := timestamp()
        let num := number()

        // Store block.timestamp and block.number in memory
        mstore(add(ptr, 0x40), ts)
        mstore(add(ptr, 0x60), num)
        mstore(add(ptr, 0x80), caller())
        let hash := keccak256(ptr, 0xa0) // 160 bytes = 5 * 32 bytes
        let random := mod(hash, range)        
        result := add(random, 1)
    }
    return result;
}

function incrementSupply(CharacterInfo storage characterInfo, uint256 wearableId) internal returns (uint256, string memory) {
    string memory nameSuffix;

    if (wearableId == 0) {
        characterInfo.BodyMint++;
        nameSuffix = " >> Body";
        return (characterInfo.BodyMint, characterInfo.Name);
    } 

    if (wearableId == 1) {
        characterInfo.ChestArmorMint++;
        nameSuffix = " >> Chest Armor";
        return (characterInfo.ChestArmorMint, string(abi.encodePacked(characterInfo.Name, nameSuffix)));
    } 

    if (wearableId == 2) {
        characterInfo.HeadgearMint++;
        nameSuffix = " >> Head Gear";
        return (characterInfo.HeadgearMint, string(abi.encodePacked(characterInfo.Name, nameSuffix)));
    } 

    if (wearableId == 3) {
        characterInfo.BackpackMint++;
        nameSuffix = " >> Back Pack";
        return (characterInfo.BackpackMint, string(abi.encodePacked(characterInfo.Name, nameSuffix)));
    } 

    if (wearableId == 4) {
        characterInfo.RightHandMint++;
        nameSuffix = " >> Right Hand";
        return (characterInfo.RightHandMint, string(abi.encodePacked(characterInfo.Name, nameSuffix)));
    } 

    if (wearableId == 5) {
        characterInfo.LeftHandMint++;
        nameSuffix = " >> Left Hand";
        return (characterInfo.LeftHandMint, string(abi.encodePacked(characterInfo.Name, nameSuffix)));
    } 

    if (wearableId == 6) {
        characterInfo.FaceMint++;
        nameSuffix = " >> Face";
        return (characterInfo.FaceMint, string(abi.encodePacked(characterInfo.Name, nameSuffix)));
    }

    revert InvalidItemType();
}

function create(CreateParam[] calldata params) public payable nonReentrant whenNotContract(msg.sender){
    LibSettings.Layout storage settings = LibSettings.layout();
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();

    IMaggooNFT maggooNFT = IMaggooNFT(settings.MAGGOONFT); 
     if(address(maggooNFT) == address(0)){
        revert InvalidContractAddress();
    }

    CreateConfig memory config;
    config.timestamp = block.timestamp;
    config.maggooCount = maggooLib.characterCount;
    config.length = params.length;
    (config.eggFee,config.mysteryboxFee) = (settings.eggFee,settings.mysteryboxFee);
   
    for(uint256 i; i < config.length;){
        config.param = params[i];
   
        config.characterId =  getRandomNumber(config.param.entryPoint,i,config.maggooCount); 
        config.totalDeposit += config.param.isBase ? config.eggFee : config.mysteryboxFee;
        config.wearableId = config.param.isBase ? 0 : getRandomNumber(config.param.entryPoint, i, 6);
        
        CharacterInfo storage characterInfo = maggooLib.characterInfo[config.characterId];
        (config.currentSupply, config.characterName) = incrementSupply(characterInfo,config.wearableId);
      
        if(config.currentSupply > characterInfo.TotalSupply){
           revert ExceedsMaximumSupply(config.currentSupply,characterInfo.TotalSupply);
        }
      
        config.tokenId = (config.characterId * (config.param.isBase ? LibMaggoo.BODY_TOKEN_ID_START : LibMaggoo.WEARABLE_TOKEN_ID_START));
        config.tokenId += (config.param.isBase ? config.currentSupply : config.wearableId);
        
        Character storage character = maggooLib.characters[config.tokenId];
        if (character.isInitialized) {
            if(character.isBaseBody){
                revert CharacterAlreadyExists(config.tokenId);
            }
        } else{
            character.name = config.characterName;
            character.tokenId = config.tokenId;
            character.isBaseBody =  config.param.isBase;
            character.isInitialized = true;

            if (character.isBaseBody) {
                character.createdAt = config.timestamp;
                character.creator = msg.sender;
                character.hashPower = characterInfo.HP;
            } else {
                character.hashPower = characterInfo.HP > config.wearableId ? characterInfo.HP - config.wearableId : 0;
            }
        }

        maggooLib.userMintHistory[msg.sender].push(MintInfo({tokenId:config.tokenId,blockTimestamp:config.timestamp}));

        maggooNFT.mint(msg.sender,config.tokenId,1);
        unchecked {
            i++;
        }
    }

    if(msg.value < config.totalDeposit){
        revert DepositAmountMismatch(msg.value,config.totalDeposit);
    }
    TransferHelper.safeTransferETH(settings.feeReceiver,address(this).balance);
}

function verifyWearableItem(uint256 bodyId, uint256 wearableId) public pure returns (bool) {
    return (bodyId /  LibMaggoo.BODY_TOKEN_ID_START) == (wearableId / LibMaggoo.WEARABLE_TOKEN_ID_START);
}

function getMintHistory(address user) external view returns(MintInfo[] memory){
    return LibMaggoo.layout().userMintHistory[user];
}

function upgrade(uint256 tokenId, uint256[] calldata wearables) external{
    LibSettings.Layout storage settings = LibSettings.layout();
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();

    IMaggooNFT maggooNFT = IMaggooNFT(settings.MAGGOONFT);

    uint256 length = wearables.length;

    Character storage character = maggooLib.characters[tokenId];
    if(!character.isInitialized){
        revert CharacterDoesNotExist(tokenId);
    }

    if(!character.isBaseBody){
        revert CharacterIsNotBaseBody(tokenId);
    }

    if(maggooNFT.balanceOf(msg.sender, character.tokenId) < 1){
        revert InsufficientMaggooNFTBalance(1, 0);
    }

    for(uint256 i; i<length;){
        uint256 wearableTokenId = wearables[i];      
        uint256 currentBalance = maggooNFT.balanceOf(msg.sender, wearableTokenId);
        if (currentBalance < 1) {
            revert InsufficientMaggooNFTBalance(1, currentBalance);
        }

        if (!maggooNFT.isApprovedForAll(msg.sender, address(this))) {
            revert NotApprovedForTransfer(msg.sender, address(this));
        }

        if(!verifyWearableItem(tokenId, wearableTokenId)){
            revert InvalidWearableItem(tokenId,wearableTokenId);
        }

        uint256 wearableBodyId =  wearableTokenId / LibMaggoo.WEARABLE_TOKEN_ID_START;
        uint256 wearableItemId = wearableTokenId % LibMaggoo.WEARABLE_TOKEN_ID_START;

        if(maggooLib.attachments[tokenId][wearableItemId]){
            continue;
        }

        maggooLib.attachments[tokenId][wearableItemId] = true;
        maggooNFT.burn(msg.sender,wearableTokenId,1);

        CharacterInfo memory characterInfo  = maggooLib.characterInfo[wearableBodyId];
        uint256 hashPower = characterInfo.HP - wearableItemId;
        character.wearableItems.push(
             WearableItem ({
                    isEquipped:true,
                    slot:WearableSlot(wearableItemId), 
                    tokenId:wearableTokenId,
                    equippedAt:block.timestamp,
                    unequippedAt:0,
                    level:0,
                    score:0,
                    hashPower:hashPower
            })
        );
        character.hashPower += hashPower;
        unchecked{
            i++;
        }
    }
}


function setFanToken(uint256 tokenId, address token) isValidContract(token) external{
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();
    LibSettings.Layout storage settings = LibSettings.layout();

    IMaggooNFT maggooNFT = IMaggooNFT(settings.MAGGOONFT);
    if(maggooNFT.balanceOf(msg.sender, tokenId) < 1){
        revert InsufficientMaggooNFTBalance(1, 0);
    }

    Character storage character = maggooLib.characters[tokenId];
    if(!character.isInitialized){
        revert CharacterDoesNotExist(tokenId);
    }

    if(!character.isBaseBody){
        revert CharacterIsNotBaseBody(tokenId);
    }

    if(character.token.token != address(0)){
        revert TokenIsAlreadyDefined(character.token.token);
    }

    IKERC20 fanToken = IKERC20(token);
    character.token.token = token;
    character.token.name = fanToken.name();
    character.token.symbol = fanToken.symbol();
    character.token.decimals = fanToken.decimals();
}

function fetchAmount(uint amountIn,uint reserveIn,uint reserveOut) public pure returns (uint amountOut) {
    if(amountIn == 0){
        return 0;
    }
    if((reserveIn == 0) ||(reserveOut > 0)){
        return 0;
    }

    uint amountInWithFee = amountIn * 997;
    uint numerator = amountInWithFee * reserveOut;
    uint denominator = (reserveIn * 1000) + amountInWithFee;
    amountOut = numerator / denominator;
}

    function fetchPair(PairInput memory params) public view returns (PairInfo memory pairInfo) {
        if (params.pair == address(0)) {
            pairInfo.valid = false;
            return pairInfo;
        }
        pairInfo.valid = true;
        pairInfo.pair = IPAIR(params.pair);
        pairInfo.token0 = IKERC20(pairInfo.pair.token0());
        pairInfo.token1 = IKERC20(pairInfo.pair.token1());
        pairInfo.token0Decimals = pairInfo.token0.decimals();
        pairInfo.token1Decimals = pairInfo.token1.decimals();
        (pairInfo.reserve0, pairInfo.reserve1, ) = pairInfo.pair.getReserves();

        if ((pairInfo.reserve0 == 0) || (pairInfo.reserve1 == 0)) {
            pairInfo.valid = false;
            return pairInfo;
        }

        (uint reserveA, uint reserveB) = params.input == address(pairInfo.token0)
            ? (pairInfo.reserve0, pairInfo.reserve1)
            : (pairInfo.reserve1, pairInfo.reserve0);
        uint amountOut = fetchAmount(params.amount, reserveA, reserveB);
        (pairInfo.amount0Out, pairInfo.amount1Out) = params.input ==address(pairInfo.token0) ? (uint(0), amountOut): (amountOut, uint(0));
        pairInfo.router = params.router;
        pairInfo.weth = params.weth;
    }

function getTokenPrice(address token, uint256 amount) public view returns(uint256){
    LibSettings.Layout storage settings = LibSettings.layout();
    IChilizWrapper chilizWrapper = IChilizWrapper(settings.FANWRAPPER);
    address baseAddress = settings.WETHDEFAULT;
    address quoteAddress = chilizWrapper.underlyingToWrapped(token);

    address pair = IDEX(settings.KAYENRouter).getPair(baseAddress,quoteAddress);

     PairInput memory pairInput = PairInput({
         router:settings.KAYENRouter,
         pair:pair,
         input:quoteAddress,
         weth:baseAddress,
         amount: 1 ether * amount
    });

    PairInfo memory pairInfo = fetchPair(pairInput);
    return address(pairInfo.token0) == quoteAddress ? pairInfo.amount1Out : pairInfo.amount0Out;
}

function upgradeWearable(uint256 tokenId, uint256 wearableId, uint256 amount) external{
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();
    LibSettings.Layout storage settings = LibSettings.layout();

    IMaggooNFT maggooNFT = IMaggooNFT(settings.MAGGOONFT);
    if(maggooNFT.balanceOf(msg.sender, tokenId) < 1){
        revert InsufficientMaggooNFTBalance(1, 0);
    }

    Character storage character = maggooLib.characters[tokenId];
    if(!character.isInitialized){
        revert CharacterDoesNotExist(tokenId);
    }

    if(!character.isBaseBody){
        revert CharacterIsNotBaseBody(tokenId);
    }

    if(character.token.token == address(0)){
        revert TokenDoesNotExist(character.token.token);
    }

    if(character.wearableItems.length < wearableId){
        revert InvalidAction();
    }

    IKERC20 fanToken = IKERC20(character.token.token);
    if(fanToken.allowance(msg.sender, address(this))< amount){
        revert InsufficientAllowance();
    }

    if(fanToken.balanceOf(msg.sender) < amount){
        revert InsufficientBalance();
    }

    TransferHelper.safeTransferFrom(character.token.token,msg.sender,settings.feeReceiver,amount);
    uint256 score = getTokenPrice(character.token.token,amount);
    character.wearableItems[wearableId].level += amount;
    character.wearableItems[wearableId].score += score;

    character.level += (amount * 2);
    character.levelScore += (score * 2);

}

function getCharacter(uint256 tokenId) external view returns(Character memory){
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();
    return maggooLib.characters[tokenId];
}

function getRoyaltiesInfo(address _contract, uint256 tokenId, uint256 _salePrice) external view returns (address, uint256){
    uint256 royaltiesAmount = (_salePrice * 750) / 10000;   
    LibSettings.Layout storage settings = LibSettings.layout();
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();

    address feeReceiver = settings.feeReceiver;
    if(tokenId >= LibMaggoo.BODY_TOKEN_ID_START){
       feeReceiver = maggooLib.characters[tokenId].creator;
    }
    return (feeReceiver,royaltiesAmount);
}


function addressToString(address _address) internal pure returns (string memory){
    bytes32 value = bytes32(uint256(uint160(_address)));
    bytes16 alphabet = "0123456789abcdef";

    bytes memory str = new bytes(42);
    str[0] = "0";
    str[1] = "x";
    for (uint256 i; i < 20; i++) {
    str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
    str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
    }
return string(str);
}


function getAssetURI(address _contract, uint256 tokenId) external pure returns(string memory){
    return string(abi.encodePacked("https://api.kewl.exchange/metadata/",addressToString(_contract),"/",tokenId.toString()));
}

function checkBalances(address user, uint256 bodyTokenId) external view returns(Character[] memory characters){
    LibSettings.Layout storage settings = LibSettings.layout();
    LibMaggoo.Layout storage maggooLib = LibMaggoo.layout();
    IMaggooNFT maggooNFT = IMaggooNFT(settings.MAGGOONFT); 
    uint256 maggooItemLength = 7; 
    uint256 characterId = bodyTokenId / LibMaggoo.BODY_TOKEN_ID_START;
    
    characters  = new Character[](maggooItemLength);
    for(uint256 i; i < maggooItemLength;){
        uint256 tokenId = i == 0  ? bodyTokenId : ((characterId * LibMaggoo.WEARABLE_TOKEN_ID_START) + i) ;
        uint256 userBalance = maggooNFT.balanceOf(user,tokenId);
        Character memory character = maggooLib.characters[tokenId];
        character.extraParam = userBalance;
        characters[i] = character;
        unchecked{
            i++;
        }    
    }





}

}