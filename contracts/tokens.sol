// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Link is ERC20 {

  constructor() ERC20("Chainlink", "LINK") {
    _mint(msg.sender, 1000);
    // should maybe be written correctly
    // 1000 * 10 ** 18
  }
}