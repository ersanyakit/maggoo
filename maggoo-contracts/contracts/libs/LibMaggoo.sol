// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;
import "../structs/Structs.sol";
library LibMaggoo {

    uint256 constant BODY_TOKEN_ID_START     = 1000000000000;
    uint256 constant WEARABLE_TOKEN_ID_START =          1000;

   struct Layout {
        uint256 characterCount;
        // index -> characterInfo
        mapping(uint256 => CharacterInfo) characterInfo;

        // tokenId -> character
        mapping(uint256 => Character) characters;

        // tokenId -> slot -> exists
        mapping(uint256 => mapping(uint256=> bool)) attachments;

        mapping(address => MintInfo[]) userMintHistory;

    }

    bytes32 internal constant STORAGE_SLOT = keccak256('com.maggoo.nfts');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }

function calculateLevelScore(uint8 level) public pure returns (uint256) {
    return (level * (level + 1)) / 2;
}

function calculateLevelFromScore(uint256 score) public pure returns (uint8) {
    uint256 n = (sqrt(1 + 8 * score) - 1) / 2;
    return uint8(n);
}

function sqrt(uint256 x) internal pure returns (uint256) {
    uint256 z = (x + 1) / 2;
    uint256 y = x;
    while (z < y) {
        y = z;
        z = (x / z + z) / 2;
    }
    return y;
}

}