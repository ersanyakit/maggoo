// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IDEX {
    function feeTo() external view returns(address);
    function createPair(address tokenA, address tokenB) external;
    function getPair(address tokenA, address tokenB) external view returns(address);
}