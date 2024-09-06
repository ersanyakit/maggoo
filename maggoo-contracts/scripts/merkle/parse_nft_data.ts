
const NFTData = require( "./nftdata.json");

const totalNFTLength = NFTData.length;

const genesisAddress = "0x0000000000000000000000000000000000000000";


const BODY_TOKEN_ID_START     = 1000000000000;
const WEARABLE_TOKEN_ID_START =          1000;

const initialQuantity = 1000;
const quantityDecreaseLimit = 10;
const nftIDIncreaseLimit = 1000000000000;
const nftWearableIDIncreaseLimit = 1000;

var nftItemIndex = 0;
var wearableIndex = 0;
var quantity = 0;

const wearableAssets = ["Chest","Head","Back Pack","Right Hand","Left Hand","Face"];
const wearableAssetsHex = ["A","B","C","D","E","F"];

var wearableItemIndex =  0;
const nftList = [];
var nftItem = undefined;
var wearableItem = undefined;
var currentId = 0;
var bodyItemIndex = 0;
quantity = initialQuantity;
for (nftItemIndex = 0 ; nftItemIndex < totalNFTLength; nftItemIndex++){

    for (bodyItemIndex = 1; bodyItemIndex < quantity+1; bodyItemIndex++){
        currentId = nftIDIncreaseLimit * (nftItemIndex+1) + bodyItemIndex;
        var bodyNFTName = NFTData[nftItemIndex][9];

        var _genAddress = genesisAddress;
        var _currentIdStr = currentId.toString();
        var position = genesisAddress.length-_currentIdStr.length;
        var address = [_genAddress.slice(0, position), _currentIdStr].join('');

        nftItem = {"address":address,"nft_id":currentId,"name":bodyNFTName,"quantity":quantity,"is_main":true};
        nftList.push(nftItem);

        if (bodyItemIndex == quantity){
            for (wearableIndex = 0; wearableIndex<wearableAssets.length;wearableIndex++){
                wearableItemIndex = (WEARABLE_TOKEN_ID_START * (nftItemIndex+1)) + (wearableIndex+1);
                var _currentWearableIdStr = wearableAssetsHex[wearableIndex];
                var wearableAddress = genesisAddress;
                var wearableAddressIdStr = `${wearableItemIndex}${_currentWearableIdStr}`;
                var wearablePosition = genesisAddress.length-wearableAddressIdStr.length;
                wearableAddress = [wearableAddress.slice(0, wearablePosition), wearableAddressIdStr].join('');
                var wearableName = `${bodyNFTName} > ${wearableAssets[wearableIndex]}`;
                wearableItem = {"address":wearableAddress,"nft_id":wearableItemIndex,"name":wearableName,"quantity":quantity,"is_main":false};
                nftList.push(wearableItem);
            }
        }
    }

    quantity = quantity - quantityDecreaseLimit; // 2250 - 20;
}

console.log(JSON.stringify(nftList))
