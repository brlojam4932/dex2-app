const { expect } = require("chai");
const { ethers } = require("hardhat");

/*
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
    // to.greaterthan, less than - check docs for actual code
  });
});
*/

/*
describe("Token contract", function () {
  let Tokens, token, owner, addr1, addr2;

  beforeEach(async () => {
    Tokens = await ethers.getContractFactory("Token");
    token = await Tokens.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
      // here we compare address to address
    });

    it("should assign the total supplay of tokens to owner", async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
      // here we compare big number to big number, "under the hood"
    });
  });

  describe('Transactions', () => {
    it("should transfer tokens between accounts", async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
    // test a failing assertion
    it("should fail if sender has insufficient token balance", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Insufficient token balance");

      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
    it("should update token balance after transfers", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // transfers to addr1 and addr2
      await token.transfer(addr1.address, 100); 
      await token.transfer(addr2.address, 50);

      // test final owner balance has decreased
      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
      // --> Adrian comments we are subtracting Big Number and js number, together, automatically

      // assertions for addr1 & addr2 balance
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});

*/
// https://youtu.be/9Qpi80dQsGU
// Hardhat tut | smart contract framework
// Eat the blocks

// npx hardhat test
// specific files
// npx hardhat tes/special_test.js

// https://youtu.be/0r7mgJTeoD0?t=2301
// example:
// console.log("price: " + new ethers.BigNumber.from(result._hex).toSting())

// https://youtu.be/GBc3lBrXEBo
// forking from main net

// npx hardhat test 
// also use short-hand command
// hh test

// https://youtu.be/oTpmNEYV8iQ
// video with actual testing

//https://youtu.be/JBudoefuKBk
// web3, react, hrdhat, ethers