// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
/// Already Exists
    error AlreadyExists();
// Invalid Proposal
    error InvalidProposal();
/// Contract is paused!
    error Paused();
/// Invalid Action!
    error InvalidAction();


error DepositAmountMismatch(uint256 requiredAmount, uint256 providedAmount);
error ExceedsMaximumSupply(uint256 currentQuantity, uint256 maximumSupply);
error CharacterAlreadyExists(uint256 tokenId);
error CharacterDoesNotExist(uint256 tokenId);
error CharacterIsNotBaseBody(uint256 tokenId);
error InvalidMerkleProof();
error InvalidWearableItem(uint256 bodyId, uint256 wearableId);
error InsufficientMaggooNFTBalance(uint256 required, uint256 available);
error NotApprovedForTransfer(address owner, address operator);
error TokenIsAlreadyDefined(address token);
error TokenDoesNotExist(address token);

/// Already Transferred
error AlreadyTransferred();
/// Invalid Address 
error InvalidAddress();
/// Invalid Action!
    error InvalidAmount();
/// Invalid Contract Address!
    error InvalidContractAddress();
/// Insufficient Balance
    error InsufficientBalance();

/// Revert with an error when an ERC721 transfer with amount other than  one is attempted.
    error InvalidERC721TransferAmount();
/**
 * @dev Revert with an error when an account being called as an assumed
 *      contract does not have code and returns no data.
 * @param account The account that should contain code.
 */
    error NoContract(address account);
/// Unsupported Item Type
    error UnsupportedItemType();
/// Invalid Item Type
    error InvalidItemType();
/// Approval Required!
    error ApprovalRequired();
/// Invalid Deposit Amount
    error InvalidDepositAmount();

/// Insufficient Allowance
error InsufficientAllowance();

/// InvalidMerkleRoot
    error InvalidMerkleRoot();
/// Already Claimed
    error AlreadyClaimed();
/// Invalid Asset Type
    error InvalidAssetType();
/// Insufficient Stake Amount
    error InsufficientStakeAmount();

    error CNSRegistrationRequired();

    error InvalidAsset(address token);




/// Market

/// Order count must be greater than 0
    error InvalidOrderAmount();

/// This order is cancelled!
    error OrderIsCancelled();

/// This order is already closed!
    error OrderIsAlreadyCompleted();

/// Order is already cancelled!
    error OrderIsAlreadyCancelled(uint256 itemId);

/// Invalid Market Item!
    error InvalidMarketItem();

/// Invalid Array Length!
    error InvalidArrayLength();

/// Invalid Market Item Owner!
    error InvalidMarketItemOwner();


/// Revert with an error when attempting to fulfill an order where an item has an amount of zero.
    error MissingItemAmount();

/// Total Price is not valid!;
    error InvalidTotalPrice(uint256 input, uint256 real);

/// You can't buy your own asset!
    error InvalidBuyer(address seller, address buyer);

/**
 * @dev Revert with an error when an required amount must be equal input amount
 * @param required Minimum deposit amount.
 * @param input User input deposit amount.
 */
    error InvalidBuyDepositAmount(uint256 required, uint256 input);