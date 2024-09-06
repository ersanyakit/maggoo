// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
interface IMaggooNFT {
    function mint(address account, uint256 id, uint256 amount) external;
    function burn(address account, uint256 id, uint256 amount) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function isApprovedForAll(address account, address operator) external view returns (bool);
    function royaltyInfo(uint256 tokenId, uint256 _salePrice) external view returns (address, uint256);

}
