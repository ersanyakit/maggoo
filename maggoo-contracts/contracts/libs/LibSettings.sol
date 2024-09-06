// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "../structs/Structs.sol";

library LibSettings {

    struct Layout {
        bool isPaused;
        uint256 eggFee;
        uint256 mysteryboxFee;
    
        uint256 marketFee;
      
        uint256 fee;
        address MAGGOONFT;
        address KEWLRouter;
        address KAYENRouter;
        address KEWLToken; // TOKEN
        address CNS;
        address WETH9;
        address WETHDEFAULT;
        address REWARDToken;
        address ETH;
        address FANWRAPPER;
        address feeReceiver;
        address VALIDATOR;
        address marketFeeReceiver;


        mapping(address => bool) fanTokens;
    }

    bytes32 internal constant STORAGE_SLOT = keccak256('com.maggoo.settings');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
