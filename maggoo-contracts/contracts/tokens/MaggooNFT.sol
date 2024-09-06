// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import { IERC165 } from '@solidstate/contracts/interfaces/IERC165.sol';
import { IERC1155 } from '@solidstate/contracts/interfaces/IERC1155.sol';

import { IERC1155Metadata } from  "@solidstate/contracts/token/ERC1155/metadata/IERC1155Metadata.sol";
import { ERC1155Metadata } from  "@solidstate/contracts/token/ERC1155/metadata/ERC1155Metadata.sol";
import { SolidStateERC1155 } from  "@solidstate/contracts/token/ERC1155/SolidStateERC1155.sol";



interface IMaggoo{
    function getFanToken(address _contract, uint256 _tokenId) external view returns(address);
    function isBaseAsset(address _contract, uint256 _tokenId) external view returns(bool);
    function getAssetURI(address _contract, uint256 _tokenId) external view returns(string memory);

    function getIsBase(address _contract,uint256 tokenId) external view returns(bool);
    function getHashPower(address _contract,uint256 tokenId) external view returns(uint256);
    function getLevel(address _contract,uint256 tokenId) external view returns(uint256);

    function getEarnings(address _contract,uint256 tokenId) external view returns(uint256);

    function getValidator() external view returns(address);
    function getRoyaltiesInfo(address _contract, uint256 tokenId, uint256 _salePrice) external view returns (address, uint256);
}

error UnauthorizedAction();

contract MaggooNFT is SolidStateERC1155 {

    IMaggoo public maggoo;
    uint256[] public mintedMaggos;
    uint256[] public burnedMaggos;

    constructor(address _maggoo) {
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IERC1155).interfaceId, true);
        maggoo = IMaggoo(_maggoo);
    }

    function name() public pure returns (string memory) {
        return "MAGGOO LAND";
    }

    function symbol() public pure  returns (string memory) {
        return "MAGGOO";
    }

    function totalSupply() public view returns (uint256) {
        uint256 totalSuppy;
        if(mintedMaggos.length > burnedMaggos.length){
            totalSuppy = mintedMaggos.length - burnedMaggos.length;
        }else{
            totalSuppy = burnedMaggos.length - mintedMaggos.length ;
        }
        return totalSuppy;
    }

    modifier onlyMaggoo {
        if(msg.sender != address(maggoo)){
            revert UnauthorizedAction();
        }
        _;
    }

    function maggooFactory() public view returns(address){
        return address(maggoo);
    }

    function hashPower(uint256 tokenId) public view returns(uint256){
        return maggoo.getHashPower(address(this),tokenId);
    }

    function level(uint256 tokenId) public view returns(uint256){
        return maggoo.getLevel(address(this),tokenId);
    }

    function isBase(uint256 tokenId) public view returns(bool){
        return maggoo.getIsBase(address(this),tokenId);
    }

    function fanToken(uint256 tokenId) public view returns(address){
        return maggoo.getFanToken(address(this),tokenId);
    }

    function uri(uint256 tokenId) public view override(ERC1155Metadata, IERC1155Metadata) returns (string memory) {
        return maggoo.getAssetURI(address(this),tokenId);
    }

    function mint(address account, uint256 id, uint256 amount) public onlyMaggoo{
        _mint(account, id, amount, '');
        mintedMaggos.push(id);
    }

    function burn(address account, uint256 id, uint256 amount) public onlyMaggoo{
        _burn(account, id, amount);
        burnedMaggos.push(id);
    }

    function earnings(uint256 tokenId) public view returns(uint256){
        return maggoo.getEarnings(address(this),tokenId);
    }

    function validator() public view returns(address){
        return maggoo.getValidator();
    }
 
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 amount){
        (receiver, amount) = maggoo.getRoyaltiesInfo(address(this),tokenId,salePrice);
        return (receiver, amount);
    }


}