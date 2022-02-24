const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Market Test", () => {
  let Dex, dex, Link, link, owner, addr1, addr2, addr3, addr4;

  beforeEach(async () => {
    Dex = await ethers.getContractFactory("Dex");
    dex = await Dex.deploy();

    Link = await ethers.getContractFactory("Link");
    link = await Link.deploy();

    //Testing from a different account
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      // dex owner to equal owner address (msg.sender)
      expect(await dex.owner()).to.equal(owner.address);
    });

    it("should check that the Link total supply is equal to the owner's balance", async () => {

      const ownerBalance = await link.balanceOf(owner.address);
      expect(await link.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe("Transactions", () => {
    it("Should throw an error when creating a sell market order without adequate token balance", async () => {

      const initialTokenBalance = await dex.balances(owner.address, ethers.utils.formatBytes32String("LINK"));
      console.log("Init Token Balance: ", initialTokenBalance.toNumber());

      await expect(
        dex.connect(addr1).createMarketOrder(1, ethers.utils.formatBytes32String("LINK"), 10)
      ).to.be.reverted;

      expect(await dex.balances(owner.address, ethers.utils.formatBytes32String("LINK"))).to.equal(initialTokenBalance);
    });
    it("Market BUY orders can be submitted even if the order book is empty", async () => {

      const orderBookBefore = await dex.getOrderBook(ethers.utils.formatBytes32String("LINK"), 0); // get buy side

      expect(orderBookBefore.length).to.equal(0);
      console.log("Orderbook length before: ", orderBookBefore.length);

      const marketOrderTx = await dex.createMarketOrder(0, ethers.utils.formatBytes32String("LINK"), 10);
      await marketOrderTx.wait();

      const orderBookAfter = await dex.getOrderBook(ethers.utils.formatBytes32String("LINK"), 0); // get buy side
      console.log("Orderbook length after: ", orderBookAfter.length);

      // I think it's still supposed to be empty
      expect(orderBookAfter.length).to.equal(0);
    });
    it("Market orders should not fill more limit orders than the market order amount", async () => {

      //Get the sell side orderbook
      const orderbook = await dex.getOrderBook(ethers.utils.formatBytes32String("LINK"), 1);
      expect(orderbook.length).to.equal(0);
      console.log("Orderbook SELL length start:", orderbook.length);

      await dex.addToken(ethers.utils.formatBytes32String("LINK"), link.address);

      const depositEthTx = await dex.depositEth({ value: 30000 });
      await depositEthTx.wait();

      // Send LINK tokens to accounts 1, 2, 3 from accounts 0
      const transferTx1 = await link.transfer(addr1.address, 150);
      await transferTx1.wait();

      const transferTx2 = await link.transfer(addr2.address, 150);
      await transferTx2.wait();

      const transferTx3 = await link.transfer(addr3.address, 150);
      await transferTx3.wait();

      // Approve DEX for accounts 1, 2, 3
      const approveTx1 = await link.connect(addr1).approve(dex.address, 50);
      await approveTx1.wait();
      const approveTx2 = await link.connect(addr2).approve(dex.address, 50);
      await approveTx2.wait();
      const approveTx3 = await link.connect(addr3).approve(dex.address, 50);
      await approveTx3.wait();

      //Deposit LINK into DEX for accounts 1, 2, 3
      const depositTx1 = await dex.connect(addr1).deposit(50, ethers.utils.formatBytes32String("LINK"));
      await depositTx1.wait();
      const depositTx2 = await dex.connect(addr2).deposit(50, ethers.utils.formatBytes32String("LINK"));
      await depositTx2.wait();
      const depositTx3 = await dex.connect(addr3).deposit(50, ethers.utils.formatBytes32String("LINK"));
      await depositTx3.wait();

      // Fill the Limit sell order book
      const limitSellTx1 = await dex.connect(addr1).createLimitOrder(1, ethers.utils.formatBytes32String("LINK"), 5, 300);
      await limitSellTx1.wait();

      const limitSellTx2 = await dex.connect(addr2).createLimitOrder(1, ethers.utils.formatBytes32String("LINK"), 5, 400);
      await limitSellTx2.wait();

      const limitSellTx3 = await dex.connect(addr3).createLimitOrder(1, ethers.utils.formatBytes32String("LINK"), 5, 500);
      await limitSellTx3.wait();

      // Create market order which fills 2/3 orders in the book
      const marketOrderTx = await dex.createMarketOrder(0, ethers.utils.formatBytes32String("LINK"), 10);
      await marketOrderTx.wait();
      console.log(marketOrderTx);

      //Get the sell side orderbook
      const orderbookAfter = await dex.getOrderBook(ethers.utils.formatBytes32String("LINK"), 1);
    
      expect(orderbookAfter.length).to.equal(1);
      console.log("Orderbook length: ", orderbookAfter.length)
      expect(orderbookAfter[0].filled).to.equal(0);
      console.log("Orderbook filled: ", orderbookAfter[0].filled.toNumber());
      // Note: I think it's "filled" is 0 because there are no more pending orders?
      
    });
  });

});

