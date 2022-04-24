// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract RealToken is ERC20 {
    mapping(address => uint256) public balances;

    constructor() ERC20("RealToken", "RETK") {
        _mint(msg.sender, 100000 * (10**18));
    }

    /*
    function mint(uint256 numberOfMints) public payable {
        uint256 supply = totalSupply();
        for (uint256 i; i < numberOfMints; i++) {
            _mint(msg.sender, supply + i);
            balances[msg.sender]++;
        }
    }
    */
    function mint(address to, uint256 amount) public virtual {
        //require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have minter role to mint");
        _mint(to, amount);
    }
}
// mcgrane5 from Moralis study forum
// approve function - infinity uint256 amount
//115792089237316195423570985008687907853269984665640564039457584007913129639935
