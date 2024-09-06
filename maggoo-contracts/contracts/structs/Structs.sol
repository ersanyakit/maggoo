// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "./Enums.sol";

struct SellParam {
    AssetType assetType;
    address contractAddress;
    uint256 tokenId;
    uint256 amount;
    uint256 price;
}

struct BuyParam {
    uint256 collectionId;
    uint256 itemId;
    uint256 tokenId;
    uint256 amount;
}

struct CancelParam {
    uint256 collectionId;
    uint256 itemId;
}


struct CreateParam {
    bool isBase;
    uint256 entryPoint;
}

struct WearableItem {
    bool isEquipped;
    WearableSlot slot;  
    uint256 tokenId; 
    uint256 equippedAt; 
    uint256 unequippedAt;
    uint256 level;
    uint256 score;
    uint256 hashPower;
}

struct EntityInfo{
    bool isInitialized;  
    bool isBaseBody;   
    uint256 currentQuantity; 
    uint256 maximumSupply;  
    uint256 hashPower;
    string characterName;  
    address upgradeToken;  
} 

struct Token{
    address token;
    string name;
    string symbol;
    uint256 decimals;
}

struct Character{
    bool isInitialized;  
    bool isBaseBody;
    uint256 extraParam;//can use for balance
    uint256 tokenId;  
    uint256 level;             // Karakterin seviyesi
    uint256 levelScore;      // Karakterin seviye skoru (toplam puan)
    uint256 hashPower;
    uint256 createdAt;
    address creator;
    Token token;
    string name;
    WearableItem[] wearableItems;    
}

struct CharacterInfo{
        uint256 Body;
        uint256 BodyMint;

        uint256 ChestArmor;
        uint256 ChestArmorMint;

        uint256 Headgear;
        uint256 HeadgearMint;

        uint256 Backpack;
        uint256 BackpackMint;

        uint256 RightHand;
        uint256 RightHandMint;

        uint256 LeftHand;
        uint256 LeftHandMint;

        uint256 Face;
        uint256 FaceMint;

        uint256 HP;
        uint256 TotalHP;
        uint256 TotalSupply;
        string Name;
}

struct MintInfo{
    uint256 tokenId;
    uint256 blockTimestamp;
}

struct CreateConfig{
    uint256 timestamp;
    uint256 maggooCount;
    uint256 totalDeposit;
    uint256 length;
    uint256 eggFee;
    uint256 mysteryboxFee;
    uint256 tokenId;
    uint256 wearableId;
    uint256 characterId;
    uint256 currentSupply;
    string characterName;
    CreateParam param;
}