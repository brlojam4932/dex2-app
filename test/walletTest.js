const { expect } = require("chai");
const { ethers } = require("hardhat");

// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
/*

describe("Wallet Test", function () {
  let Dex, dex, Link, link, owner, addr1, addr2;

  beforeEach(async () => {
    Dex = await ethers.getContractFactory("Dex");
    dex = await Dex.deploy();

    Link = await ethers.getContractFactory("Link");
    link = await Link.deploy();

    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployement", () => {
    it("should set the right owner", async () => {
      expect(await dex.owner()).to.equal(owner.address);
    });

    it("should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await link.balanceOf(owner.address);
      expect(await link.totalSupply()).to.equal(ownerBalance);
    });
  });
  //ethers.utils.formatBytes32String( text )
  describe("Transactions", () => {
    it("should allow tokens added by owner only", async () => {
      await dex.addToken(ethers.utils.formatBytes32String("LINK"), link.address)
    });
    it("should fail if tokens are added by anyone besides the owner", async () => {
      const initialOwnerBalance = await link.balanceOf(owner.address);

      expect(
        dex.connect(addr1).addToken(ethers.utils.formatBytes32String("LINK"), link.address)).to.be.revertedWith("Adding tokens not allowed if not the owner").catch((error) => { console.log(error) });

      expect(await link.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
    it("should allow deposits to correct token and account", async () => {
      // addToken, approve, deposit, check balances and compare to equal
      await dex.addToken(ethers.utils.formatBytes32String("LINK"), link.address);

      const approveTx = await link.approve(dex.address, 500);
      await dex.deposit(100, ethers.utils.formatBytes32String("LINK"));

      await approveTx.wait();

      // assert
      const ownerBalance = await dex.balances(owner.address, ethers.utils.formatBytes32String("LINK"));
      expect(ownerBalance).to.equal(100);

    });
    it("should not allow withdrawls greater than the balance amount", async () => {
      await dex.addToken(ethers.utils.formatBytes32String("LINK"), link.address)

      const initialOwnerBalance = await link.balanceOf(owner.address);

      expect(
        dex.withdraw(1000, ethers.utils.formatBytes32String("LINK"))
      ).to.be.revertedWith("Insufficient token balance").catch((error) => { console.log(error) });

      expect(await link.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
    it("should allow withdrawls when token balance is sufficient", async () => {
      await dex.addToken(ethers.utils.formatBytes32String("LINK"), link.address);
      const approveTx = await link.approve(dex.address, 500);

      await approveTx.wait();

      // transaction
      const depositTx = await dex.deposit(100, ethers.utils.formatBytes32String("LINK"));

      await depositTx.wait();

      const beforeBalance = await dex.balances(owner.address, ethers.utils.formatBytes32String("LINK"));
      expect(beforeBalance).to.equal(100);

      await dex.withdraw(100, ethers.utils.formatBytes32String("LINK"));

      // after withdraw, balance is updated
      const afterBalance = await dex.balances(owner.address, ethers.utils.formatBytes32String("LINK"));
      expect(afterBalance).to.equal(0);
    });
    // tests just Link contract from eat the blocks
    it("should transfer tokens between accounts", async () => {
      await link.transfer(addr1.address, 50);
      const addr1Balance = await link.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });
    it("should fail if sender has not enough link balance", async () => {
      const initialOwnerBalance = await link.balanceOf(owner.address);

      expect(
        link.connect(addr1).transfer(owner.address, 1)
      ).to.be.reverted;

      expect(await link.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
    it("it should update balances after token transfers", async () => {
      // get balanceOf
      const initialOwnerBalance = await link.balanceOf(owner.address);

      // transfers
      const transferTx1 = await link.transfer(addr1.address, 100);
      await transferTx1.wait();

      const transferTx2 = await link.transfer(addr2.address, 50);
      await transferTx2.wait();

      // test final owner balance has decreased and assert
      const finalOwnerBalance = await link.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await link.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await link.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
*/