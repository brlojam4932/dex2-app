// HANDLE ORDERS 

//--------- get trades ----------------
useEffect(() => {
  const data = window.localStorage.getItem("sell_trades");
  setIsSellInfo(JSON.parse(data));

  const buyData = window.localStorage.getItem("buy_trades");
  setIsBuyInfo(JSON.parse(buyData));
  //console.log("data", data);
}, []);

useEffect(() => {
  window.localStorage.setItem("sell_trades", JSON.stringify(isSellInfo));
  window.localStorage.setItem("buy_trades", JSON.stringify(isBuyInfo));

}, [isSellInfo, isBuyInfo]); //isLimitSellMsg, isMarketSellMsg

///////////////////////////////////////////////////

const handleLimitOrderSell = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(e.target);
    const limitOrderSellTx = await dexContract.createLimitOrder(
      1,
      ethers.utils.formatBytes32String(data.get("ticker")),
      data.get("amount"),
      ethers.utils.parseEther(data.get("price"))
    );
    await limitOrderSellTx.wait();
    console.log('limit SELL order success', limitOrderSellTx);
    setIsLimitSellMsg(true);

    //get SELL side trades
    const allTokenList = await dexContract.getTokenListLength();
    for (let i = 0; i < allTokenList; i++) {
      let tokenList = await dexContract.tokenList(i);
      // add tokenList result to ticker argument - tokenList is parsed but it's also formatted
      const sellTx = await dexContract.getOrderBook(
        ethers.utils.formatBytes32String(
          ethers.utils.parseBytes32String(tokenList)), 1);

      // loop through the sellTx instance of getOrderBook
      for (let i = 0; i < sellTx.length; i++) {
        const traderSell = sellTx[i]["trader"];
        const tickerSell = sellTx[i]["ticker"];
        const amountSell = sellTx[i]["amount"];
        const priceSell = ethers.utils.formatEther(sellTx[i]["price"]);
        const filledSell = sellTx[i]["filled"];
        console.log("LimitSell:", "Trader:", traderSell, "Symbol:", ethers.utils.parseBytes32String(tickerSell), "Amount:", amountSell.toString(), "Price:", priceSell, "Filled:", filledSell.toNumber());

        // spread operator to create a new object
        setIsSellInfo(prevSell => [
          ...prevSell,
          {
            id: uuidv4(),
            trader: traderSell,
            ticker: ethers.utils.parseBytes32String(tickerSell),
            amount: amountSell.toString(),
            price: priceSell,
            filled: filledSell.toNumber(),
          }
        ]);
      };
    }
  } catch (error) {
    console.log("error", error);
    //if (error) return alert("error...check token balance");
    setErrorLimitSell(true)
  };
};

const handleLimitOrderBuy = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(e.target);
    const limitOrderBuyTx = await dexContract.createLimitOrder(
      0,
      ethers.utils.formatBytes32String(data.get("ticker")),
      data.get("amount"),
      ethers.utils.parseEther(data.get("price"))
    );
    await limitOrderBuyTx.wait();
    console.log("limit BUY order success", limitOrderBuyTx);
    setIsLimitBuyMsg(true);

    //get BUY side trades
    const allTokenList = await dexContract.getTokenListLength();
    for (let i = 0; i < allTokenList; i++) {
      let tokenList = await dexContract.tokenList(i);

      const buyTx = await dexContract.getOrderBook(
        ethers.utils.formatBytes32String(
          ethers.utils.parseBytes32String(tokenList)), 0);

      for (let i = 0; i < buyTx.length; i++) {
        const traderBuy = buyTx[i]["trader"];
        const tickerBuy = buyTx[i]["ticker"];
        const amountBuy = buyTx[i]["amount"];
        const priceBuy = ethers.utils.formatEther(buyTx[i]["price"]);
        const filledBuy = buyTx[i]["filled"];
        console.log("LimitBuy:", "Trader:", traderBuy, "Symbol:", ethers.utils.parseBytes32String(tickerBuy), "Amount:", amountBuy.toString(), "Price:", priceBuy, "Filled:", filledBuy.toNumber());

        setIsBuyInfo(prevBuy => [
          ...prevBuy,
          {
            id: uuidv4(),
            trader: traderBuy,
            ticker: ethers.utils.parseBytes32String(tickerBuy),
            amount: amountBuy.toString(),
            price: priceBuy,
            filled: filledBuy.toNumber()
          }
        ]);
      };
    };

  } catch (error) {
    console.log("error", error);
    //if (error) return alert("error...Not enough ETH balancance");
    setErrorLimitBuy(true);
  };
};


const handleMarketOrderSell = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(e.target);
    const marketOrderSellTx = await dexContract.createMarketOrder(
      1,
      ethers.utils.formatBytes32String(data.get("ticker")),
      data.get("amount"));

    await marketOrderSellTx.wait();
    console.log("market SELL order success", marketOrderSellTx);
    setIsMarketSellMsg(true);

    //get SELL side trades
    const allTokenList = await dexContract.getTokenListLength();
    for (let i = 0; i < allTokenList; i++) {
      let tokenList = await dexContract.tokenList(i);
      // add tokenList result to ticker argument - tokenList is parsed but it's also formatted
      const sellTx = await dexContract.getOrderBook(
        ethers.utils.formatBytes32String(
          ethers.utils.parseBytes32String(tokenList)), 1);

      // loop through the sellTx instance of getOrderBook
      for (let i = 0; i < sellTx.length; i++) {
        const traderSell = sellTx[i]["trader"];
        const tickerSell = sellTx[i]["ticker"];
        const amountSell = sellTx[i]["amount"];
        const priceSell = ethers.utils.formatEther(sellTx[i]["price"]);
        const filledSell = sellTx[i]["filled"];
        console.log("MarketSell:", "Trader:", traderSell, "Symbol:", ethers.utils.parseBytes32String(tickerSell), "Amount:", amountSell.toString(), "Price:", priceSell, "Filled:", filledSell.toNumber());

        // spread operator to create a new object
        setIsSellInfo(prevSell => [
          ...prevSell,
          {
            id: uuidv4(),
            trader: traderSell,
            ticker: ethers.utils.parseBytes32String(tickerSell),
            amount: amountSell.toString(),
            price: priceSell,
            filled: filledSell.toNumber(),
          }
        ]);
      };
    }

  } catch (error) {
    console.log("error", error);
    //if (error) return alert("something went wrong");
    setErrorMarketSell(true);
  };
};


const handleMarketOrderBuy = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(e.target);
    const marketOrderTx = await dexContract.createMarketOrder(
      0, ethers.utils.formatBytes32String(data.get("ticker")), data.get("amount")
    );
    await marketOrderTx.wait();
    console.log("market BUY order success", marketOrderTx);
    setIsMarketBuyMsg(true);

    //get BUY side trades
    const allTokenList = await dexContract.getTokenListLength();
    for (let i = 0; i < allTokenList; i++) {
      let tokenList = await dexContract.tokenList(i);

      const buyTx = await dexContract.getOrderBook(
        ethers.utils.formatBytes32String(
          ethers.utils.parseBytes32String(tokenList)), 0);

      for (let i = 0; i < buyTx.length; i++) {
        const traderBuy = buyTx[i]["trader"];
        const tickerBuy = buyTx[i]["ticker"];
        const amountBuy = buyTx[i]["amount"];
        const priceBuy = ethers.utils.formatEther(buyTx[i]["price"]);
        const filledBuy = buyTx[i]["filled"];
        console.log("MarketBuy:", "Trader:", traderBuy, "Symbol:", ethers.utils.parseBytes32String(tickerBuy), "Amount:", amountBuy.toString(), "Price:", priceBuy, "Filled:", filledBuy.toNumber());

        setIsBuyInfo(prevBuy => [
          ...prevBuy,
          {
            id: uuidv4(),
            trader: traderBuy,
            ticker: ethers.utils.parseBytes32String(tickerBuy),
            amount: amountBuy.toString(),
            price: priceBuy,
            filled: filledBuy.toNumber()
          }
        ]);
      };
    };

  } catch (error) {
    console.log("error", error);
    //if (error) return alert("error...check Eth amount");
    setErrorMarketBuy(true);
  };
};

//---------- MAP THROUGH OBJECT -> SEND TO PRINT----------------
const sellList = isSellInfo.map((sells) => (
  <SellOrders key={sells.id} sells={sells} />
));

// MAP THROUGH OBJECT -> SEND TO PRINT
const buyList = isBuyInfo.map((buys) => (
  <BuyOrders key={buys.id} buys={buys} />
));

// PRINT TOKEN LIST
const myTokenList = listOfTokens.map((lists) => (
  <div key={lists.id} className="alert alert-dismissible alert-primary text-secondary">
    <div>
      <strong>Id:</strong>{" "}{lists.id}
    </div>
    <div className='text-success'>
      <strong>Token:</strong>{" "}{lists.ticker}
    </div>
  </div>

));


// REFRESH PAGE
/*
const refresh = (e) => {
  e.preventDefault();
  window.location.reload();
};
*/

//--------------Trading JSX-------------------
<div className='box-2'>
  <div className='container-6'>
    <div className='m-4'>
      <div className='container'>
        <div className='box-sell'>
          <div className='card'>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-secondary">SELLS</h6>
              <div className="px-4">
                {sellList}
              </div>
            </div>
          </div>
        </div>
        <div className='box-buy'>
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-secondary">BUYS</h6>
              <div className="px-4" >
                {buyList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>