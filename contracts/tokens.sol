// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract RealToken is ERC20 {

  constructor() ERC20("RealToken", "RETK") {
    _mint(msg.sender, 100000 * (10 ** 18));
    // should maybe be written correctly
    // 1000 * 10 ** 18
    // Fili's test minted 1000
  }
}