// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import "../libs/Modifiers.sol";
import "../structs/Structs.sol";
import "../libs/LibMaggoo.sol";

contract Characters is Modifiers{
    
function initCharacters(string[] calldata characters) external onlyOwner{
    uint256 total = 1000;
    uint256 hpInitialization = 16;
    uint256 totalHPInitialization = 91;
    uint256 length = characters.length;
    LibMaggoo.Layout storage libMaggoo = LibMaggoo.layout();
    libMaggoo.characterCount = length;
    CharacterInfo storage character; 
    for(uint256 i;i<length;){
        character = libMaggoo.characterInfo[i+1];
        character.Name = characters[i];
        character.TotalSupply = total;
        character.HP = hpInitialization;
        character.TotalHP = totalHPInitialization + (i * 7);
        unchecked{
            total -= 10;
            ++i; 
            ++hpInitialization;
        }
    }
}

function getCharacters() external view returns(CharacterInfo[] memory characters){
    LibMaggoo.Layout storage libMaggoo = LibMaggoo.layout();
    uint256 length = libMaggoo.characterCount;
    characters = new CharacterInfo[](length);
    for (uint256 i; i < length;) {
        CharacterInfo memory character  = libMaggoo.characterInfo[i+1];
        uint256 hpVal = character.HP;
        character.Body = hpVal;
        character.ChestArmor = hpVal - 1;
        character.Headgear = hpVal - 2;
        character.Backpack = hpVal - 3;
        character.RightHand = hpVal - 4;
        character.LeftHand = hpVal - 5;
        character.Face = hpVal - 6;

        characters[i] = character;
        unchecked{
            i++;
        }
    }
} 


}
