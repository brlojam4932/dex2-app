import React from 'react';
import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import RealToken from "./artifacts/contracts/Tokens.sol/RealToken.json";
import 'bootswatch/dist/slate/bootstrap.min.css';
import TxList from './components/TxList.jsx';
import Dex from "./artifacts/contracts/Dex.sol/Dex.json";
import SellOrders from './components/SellOrders';
import BuyOrders from './components/BuyOrders';
import ApproveList from './components/ApproveList';
import Header from './components/Header';
import Footer from './components/Footer';

// https://youtu.be/a0osIaAOFSE
// the complete guide to full stack ehtereum development - tutorial for beginners

// https://youtu.be/38WUVVoMZKM
// read/write/events

// ERC20 functions explained
//https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/#:~:text=The%20ERC%2D20%20standard%20allows,spend%20on%20behalf%20of%20owner%20.


//practice - Flexbox CSS in 20 minutes
//https://youtu.be/JJSoEo8JSnc

//dex deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
//Real Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

const dexContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//const myTokenSymbol = ethers.utils.formatBytes32String("RETK");

function App() {

  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();

  const [approveTx, setApproveTx] = useState([]);
  const [approveContractListened, setApproveContractListened] = useState();

  const [errorTransfer, setErrorTransfer] = useState(false);
  const [errorTransferFrom, setErrorTransferFrom] = useState(false);

  //const [errorGetTokens, setErrorGetTokens] = useState(false);
  const [errorAddToken, setErrorAddToken] = useState(false);
  const [errorDexDeposit, setErrorDexDeposit] = useState(false);
  //const [errorDexBal, setErrorDexBal] = useState(false);
  const [errorDepositEth, setErrorDepositEth] = useState(false);
  const [errorDexWithdraw, setErrorDexWithdraw] = useState(false);

  const [errorLimitSell, setErrorLimitSell] = useState(false);
  const [errorLimitBuy, setErrorLimitBuy] = useState(false);

  const [errorMarketSell, setErrorMarketSell] = useState(false);
  const [errorMarketBuy, setErrorMarketBuy] = useState(false);

  //////////////TOKEN STATES/////////////////
  const [contractAddress, setContractAddress] = useState("-");
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });

  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  });

  // affirms tx is complete and sends a visual message
  const [isApproved, setIsApproved] = useState(false);
  const [allowanceAmount, setAllowanceAmount] = useState();
  const [isAllowanceMsg, setIsAllowanceMsg] = useState(false);
  const [isTransferFrom, setIsTransferFrom] = useState(false);

  //////////////DEX STATES/////////////////

  const [dexBalanceInfo, setDexBalanceInfo] = useState([]);
  const [withDrawSuccessMsg, setWithDrawSuccessMsg] = useState(false);
  const [withDrawAmountInfo, setWithDrawAmountInfo] = useState("-");

  const [isTransferMsg, setIsTransferMsg] = useState(false);
  const [transfer, setTransfer] = useState("-");

  const [isLimitSellMsg, setIsLimitSellMsg] = useState(false);
  const [isLimitBuyMsg, setIsLimitBuyMsg] = useState(false);

  const [isMarketSellMsg, setIsMarketSellMsg] = useState(false);
  const [isMarketBuyMsg, setIsMarketBuyMsg] = useState(false);

  const [addTokenSuccessMsg, setAddTokenSuccessMsg] = useState(false);
  const [depositSuccessMsg, setDepositSuccessMsg] = useState(false);
  const [depositEthSuccessMsg, setDepositEthSuccessMsg] = useState(false);
  const [depositEthAmount, setDepositEthAmount] = useState("-");

  const [isSellInfo, setIsSellInfo] = useState([]);
  const [isBuyInfo, setIsBuyInfo] = useState([]);

  const [listOfTokens, setListOfTokens] = useState([]);

  //tabs
  const [toggleTabState, setToggleTabState] = useState(1);
  const [toggleTabState2, setToggleTabState2] = useState(5);
  const [toggleTabState3, setToggleTabState3] = useState(9);

  const toggleTabs = (index) => {
    setToggleTabState(index);
  };

  const toggleTabs2 = (index) => {
    setToggleTabState2(index);
  };

  const toggleTabs3 = (index) => {
    setToggleTabState3(index);
  };

  // ethers js /// provider is read only; signer is write to contract

  // TOKEN EVENTS
  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, provider);

      //event Transfer(address indexed from, address indexed to, uint256 value);

      erc20.on("Transfer", (from, to, amount, event) => {
        //event.removeListener(); // Solve memory leak with this.
        console.log({ from, to, amount, event });
        // the transaction result gets copied over to a state
        setTxs((prevTx) => [
          ...prevTx,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: ethers.utils.formatEther(amount), //amount: String(amount)
          }
        ]);
      });
      setContractListened(erc20);

      return () => {
        contractListened.removeAllListeners();
      }
    };

  }, [contractInfo.address]);


  // APPROVE EVENTS
  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const token = new ethers.Contract(contractInfo.address, RealToken.abi, provider);

      token.on("Approve", (spender, amount, event) => {
        console.log({ spender, amount, event });

        setApproveTx(prev => [
          ...prev,
          {
            txHash: event.transactionHash,
            spender,
            amount: ethers.utils.formatEther(amount)
          }
        ]);
      });
      setApproveContractListened(token);

      return () => {
        approveContractListened.removeAllListeners();
      };
    };

  }, [contractInfo.address]);


  // GET SELL ORDERS
  const handleGetSellOrders = async () => {
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, provider);

      // get token list
      const allTokenList = await dex.getTokenListLength();
      for (let i = 0; i < allTokenList; i++) {
        let tokenList = await dex.tokenList(i);
        // add tokenList result to ticker argument - tokenList is parsed but it's also formatted
        const sellTx = await dex.getOrderBook(
          ethers.utils.formatBytes32String(
            ethers.utils.parseBytes32String(tokenList)), 1);

        // loop through the sellTx instance of getOrderBook
        for (let i = 0; i < sellTx.length; i++) {
          const traderSell = sellTx[i]["trader"];
          const tickerSell = sellTx[i]["ticker"];
          const amountSell = sellTx[i]["amount"];
          const priceSell = ethers.utils.formatEther(sellTx[i]["price"]);
          const filledSell = sellTx[i]["filled"];
          console.log("Sell:", "Trader:", traderSell, "Symbol:", ethers.utils.parseBytes32String(tickerSell), "Amount:", amountSell.toString(), "Price:", priceSell, "Filled:", filledSell.toNumber());

          // spread operator to create a new object
          setIsSellInfo(prev => [
            ...prev,
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
      console.log("error...from get sell orderbook", error);
    }
  };

  useEffect(() => {
    if (isSellInfo.length === 0) {
      handleGetSellOrders();
    }

  }, []);

  // MAP THROUGH OBJECT -> SEND TO PRINT
  const sellList = isSellInfo.map((orders) => (
    <SellOrders key={orders.id} orders={orders} />
  ));

  // GET BUY ORDERS
  const handleGetBuyOrders = async () => {
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, provider);
      const allTokenList = await dex.getTokenListLength();

      for (let i = 0; i < allTokenList; i++) {
        let tokenList = await dex.tokenList(i);

        const buyTx = await dex.getOrderBook(
          ethers.utils.formatBytes32String(
            ethers.utils.parseBytes32String(tokenList)), 0);

        for (let i = 0; i < buyTx.length; i++) {
          const traderBuy = buyTx[i]["trader"];
          const tickerBuy = buyTx[i]["ticker"];
          const amountBuy = buyTx[i]["amount"];
          const priceBuy = ethers.utils.formatEther(buyTx[i]["price"]);
          const filledBuy = buyTx[i]["filled"];
          console.log("Buy:", "Trader:", traderBuy, "Symbol:", ethers.utils.parseBytes32String(tickerBuy), "Amount:", amountBuy.toString(), "Price:", priceBuy, "Filled:", filledBuy.toNumber());

          setIsBuyInfo(prev => [
            ...prev,
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
    }
  };

  useEffect(() => {
    if (isBuyInfo.length === 0) {
      handleGetBuyOrders();
    }

  }, []);

  // MAP THROUGH OBJECT -> SEND TO PRINT
  const buyList = isBuyInfo.map((orders) => (
    <BuyOrders key={orders.id} orders={orders} />
  ));


  // REFRESH PAGE
  const refresh = (e) => {
    e.preventDefault();
    window.location.reload();
  };


  // GET ERC20 TOKEN CONTRACT
  const handleGetTokenInfo = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const erc20 = new ethers.Contract(data.get(contractAddress), RealToken.abi, provider);

      const tokenName = await erc20.name();
      const tokenSymbol = await erc20.symbol();
      const totalSupply = await erc20.totalSupply();

      setContractInfo({
        address: data.get(contractAddress),
        tokenName,
        tokenSymbol,
        totalSupply: ethers.utils.formatEther(totalSupply)
      });
      setContractAddress(data);
    } catch (error) {
      console.log("error", error);
      if (error) return alert("not loggein to Metamask");
    }
  };


  /////////////// DEX //////////////////
  const handleAddToken = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      // add provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // get signer
      const signer = provider.getSigner();
      // create instance
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      await provider.send("eth_requestAccounts", []);
      // create function from Contract
      const addTokenTx = await dex.addToken(
        ethers.utils.formatBytes32String(data.get("ticker")), contractInfo.address
      );
      await addTokenTx.wait();
      //console.log("Add Token: ", addTokenTx);
      setAddTokenSuccessMsg(true);

    } catch (error) {
      console.log("error", error);
      //if (error) return alert("error...check correct address or you may need to approve DEX");
      setErrorAddToken(true);
    };
  };


  // GET ALL TOKENS
  const getAllTokensList = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, provider);
      const allTokenList = await dex.getTokenListLength();
      //console.log("token list length:", allTokenList.toNumber());
      for (let i = 0; i < allTokenList; i++) {
        let tokenList = await dex.tokenList(i);
        //console.log("token list token:", ethers.utils.parseBytes32String(tokenList));
        setListOfTokens(prev => [
          ...prev,
          {
            id: uuidv4(),
            ticker: ethers.utils.parseBytes32String(tokenList)
          }
        ]);

      };
    } catch (error) {
      console.log('error', error);
      if (error) return alert("tokenlist error");
    }
  };

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


  const getDexBalances = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const tickerBalance = await dex.balances(signerAddress,
        ethers.utils.formatBytes32String(data.get("ticker")));

      setDexBalanceInfo({
        address: signerAddress,
        ticker: ethers.utils.formatEther(tickerBalance)
      });
    } catch (error) {
      console.log("error", error);
      if (error) return alert("error...login to Metamask or Coinbase Link Wallet");
    }
  };


  const handleLimitOrderSell = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      await provider.send("eth_requestAccounts", []);

      const limitOrderSellTx = await dex.createLimitOrder(
        1,
        ethers.utils.formatBytes32String(data.get("ticker")),
        data.get("amount"),
        ethers.utils.parseEther(data.get("price"))
      );
      await limitOrderSellTx.wait();
      console.log('limit SELL order success', limitOrderSellTx);
      setIsLimitSellMsg(true);

    } catch (error) {
      console.log("error", error);
      //if (error) return alert("error...check token balance");
      setErrorLimitSell(true)
    };
  };


  const handleLimitOrderBuy = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      // add provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // add signer
      const signer = provider.getSigner();
      // add instance
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      // transact
      await provider.send("eth_requestAccounts", []);

      const limitOrderBuyTx = await dex.createLimitOrder(
        0,
        ethers.utils.formatBytes32String(data.get("ticker")),
        data.get("amount"),
        ethers.utils.parseEther(data.get("price"))
      );
      await limitOrderBuyTx.wait();
      console.log("limit BUY order success", limitOrderBuyTx);
      setIsLimitBuyMsg(true);

    } catch (error) {
      console.log("error", error);
      //if (error) return alert("error...Not enough ETH balancance");
      setErrorLimitBuy(true);
    };
  };


  const handleMarketOrderSell = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      // add Form data
      const data = new FormData(e.target);
      // add provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // add signer
      const signer = provider.getSigner();
      // add new Contract instance
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      // create tx
      await provider.send("eth_requestAccounts");

      const marketOrderSellTx = await dex.createMarketOrder(
        1,
        ethers.utils.formatBytes32String(data.get("ticker")),
        data.get("amount"));

      await marketOrderSellTx.wait();
      console.log("market SELL order success", marketOrderSellTx);
      setIsMarketSellMsg(true);

    } catch (error) {
      console.log("error", error);
      //if (error) return alert("something went wrong");
      setErrorMarketSell(true);
    };
  };


  const handleMarketOrderBuy = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      await provider.send("eth_requestAccounts", []);

      const marketOrderTx = await dex.createMarketOrder(
        0, ethers.utils.formatBytes32String(data.get("ticker")), data.get("amount")
      );
      await marketOrderTx.wait();
      console.log("market BUY order success", marketOrderTx);
      setIsMarketBuyMsg(true);

    } catch (error) {
      console.log("error", error);
      //if (error) return alert("error...check Eth amount");
      setErrorMarketBuy(true);
    };
  };


  // DEPOSIT ERC20 TOKENS INTO DEX
  const handleDexTokenDeposit = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      await provider.send("eth_requestAccounts", []);
      const dexDepositTx = await dex.deposit(
        ethers.utils.parseEther(data.get("amount")), ethers.utils.formatBytes32String(data.get("ticker"))
      );
      await dexDepositTx.wait();
      //console.log("Dex deposit tx: ", dexDepositTx);
      setDepositSuccessMsg(true);

    } catch (error) {
      console.log("error", error);
      //if (error) return alert("error...insufficient allowance, token does not exist");
      setErrorDexDeposit(true);
    };
  };

  ////////////////// TOKEN CONT... //////////////////////

  const handleDepositEth = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      await provider.send("eth_requestAccounts", []);
      const depositEthTx = await dex.depositEth({ value: ethers.utils.parseEther(data.get("amount")) });
      await depositEthTx.wait();
      //console.log("Deposit ETH: ", depositEthTx);
      //console.log("Deposit ETH: ", depositEthTx.value.toString());
      setDepositEthSuccessMsg(true);
      //setDepositEthAmount(depositEthTx.value.toString());
      setDepositEthAmount(ethers.utils.formatEther(depositEthTx.value));


    } catch (error) {
      //console.log("error", error);
      setErrorDepositEth(true);
    };
  };


  const getMyBalance = async () => {
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const balance = await erc20.balanceOf(signerAddress);
      const ethFormatBalance = ethers.utils.formatEther(balance);

      setBalanceInfo({
        address: signerAddress,
        balance: String(ethFormatBalance)
      });
    } catch (error) {
      console.log("error", error);
      if (error) return alert("login with metamask or input contract address");
    }
  };


  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      await provider.send("eth_requestAccounts", []);
      const transaction = await erc20.transfer(data.get("recipient"), ethers.utils.parseEther(data.get("amount")));
      await transaction.wait();
      //console.log('Success! -- recipient recieved amount');
      setIsTransferMsg(true);
      setTransfer(data.get("amount"));
    } catch (error) {
      console.log(error);
      //if (error) return alert('transfer amount exceeds balance');
      setErrorTransfer(true);
    };

  };


  // function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  // address a, b & c -> a is the sender, b is the spender, c is the recipient
  // address b can send to address c on a's behalf

  const handleTransferFrom = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      await provider.send("eth_requestAccounts", [])
      const transactionFrom = await erc20.transferFrom(data.get("sender"), data.get("recipient"), ethers.utils.parseEther(data.get("amount")));
      await transactionFrom.wait();
      console.log("transferFrom -- success");
      setIsTransferFrom(true);
    } catch (error) {
      console.log(error);
      //setError(true);
      if (error) return alert("transfer from amount exceeds balance");
    };

  };


  //function approve(address spender, uint256 amount) external returns (bool);
  // address a, b & c -> address a approves address b, the spender

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      const transaction = await erc20.approve(data.get("spender"), ethers.utils.parseEther(data.get("amount")));
      await transaction.wait();
      //console.log("Success! -- approved");
      setIsApproved(true);
    } catch (error) {
      console.log(error);
      if (error) return alert("error, check address or re-set Metamask");

    }
  }


  // function allowance(address owner, address spender) external view returns (uint256);
  // address a is owner and address b is the spender -> checks the balance owner allows spender to spend

  const handleAllowance = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, provider);
      const signer = provider.getSigner();
      const owner = await signer.getAddress();
      console.log(owner);
      const allowance = await erc20.allowance(data.get("owner"), data.get("spender"));
      console.log(allowance.toString());
      setIsAllowanceMsg(true);
      setAllowanceAmount(ethers.utils.formatEther(allowance));

      return allowance;

    } catch (error) {
      console.log(error);
      if (error) return alert("Input correct address");
    };

  };

  // WITHDRAW ERC20 TOKENS FROM DEX

  const handleWithDraw = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      // use Form data
      const data = new FormData(e.target);
      //get provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // get signer
      const signer = provider.getSigner();
      // create instance
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      // send tx
      await provider.send("eth_requestAccounts", []);
      // create receipt
      const withdrawTx = await dex.withdraw(
        ethers.utils.parseEther(data.get("amount")), ethers.utils.formatBytes32String(data.get("ticker"))
      );
      await withdrawTx.wait();
      console.log("withdraw: ", withdrawTx);

      setWithDrawSuccessMsg(true);
      //setWithDrawAmountInfo(ethers.utils.formatEther(withdrawTx.value));
      setWithDrawAmountInfo(data.get(("amount")));


    } catch (error) {
      console.log("error", error);
      //if (error) return alert("balance may be insufficient");
      setErrorDexWithdraw(true);
    }
  }


  return (
    <>
      {/* ERC20 token info/get balance/tx/approve/allowance/txfer-from/receipts */}
      <div className='container'>
        <Header />
      </div>
      <div className='container-1'>
        <div className='box-1'>
          <form className="m-4" onSubmit={handleGetTokenInfo}>
            <div className="shadow-lg bg-darkgrey">
              <main className="mt-4 p-4">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">ERC20 token contract</h6>
                  <div className="my-3">
                    <input
                      type="text"
                      name={contractAddress}
                      className="input p-1"
                      placeholder="ERC20 contract address"
                      style={{ background: "#1f1f1f", borderStyle: "solid 1px", borderColor: "#7bc3ed", borderRadius: "5px", color: "white" }}
                    />
                  </div>
                </div>
              </main>
              <footer className="p-4">
                <button
                  type="submit"
                  className="btn btn-outline-success"
                >
                  Get token info
                </button>
              </footer>
              <div className="px-4">
                <table className="table w-full text-info">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Total supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{contractInfo.tokenName}</th>
                      <td>{contractInfo.tokenSymbol}</td>
                      <td>{String(contractInfo.totalSupply)}</td>
                      <td>{contractInfo.deployedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4">
                <button
                  onClick={getMyBalance}
                  type="submit"
                  className="btn btn-outline-success"
                >
                  Get my balance
                </button>
              </div>
              <div className="px-4">
                <table className="table w-full text-info">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{balanceInfo.address}</th>
                      <td>{balanceInfo.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
        {/* Token Tabs */}
        <div className='box-2'>
          {/* Transactions */}
          <div className='container'>
            <div className='bloc-tabs'>
              <button className={toggleTabState === 1 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs(1)}>Transfer</button>
              <button className={toggleTabState === 2 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs(2)}>Approve</button>
              <button className={toggleTabState === 3 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs(3)}>Allowance</button>
              <button className={toggleTabState === 4 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs(4)}>Transfer From</button>
            </div>

            <div className='content-tabs'>
              <div className={toggleTabState === 1 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Transfer</h3>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleTransfer}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">recipient</h6>
                      </div>
                      <input
                        type="text"
                        name="recipient"
                        className="input p-1"
                        placeholder="Recipient address"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to transfer"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Transfer
                      </button>
                      <div className="my-4 mb-2">
                        {isTransferMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsTransferMsg(false)}></button>
                            <strong>Well Done!</strong> Your transfer amount of {transfer} tokens has been completed.
                          </div>
                        }

                        {errorTransfer &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorTransfer(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your balance may be insufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>

              <div className={toggleTabState === 2 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Approve DEX <h6>or any other smart contract address</h6> </h3>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleApprove}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">approve the spender, this DEX</h6>
                      </div>
                      <input
                        type="text"
                        name="spender"
                        className="input p-1"
                        placeholder="DEX or other address"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to approve"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Approve DEX
                      </button>
                      <div className="my-4 mb-2">
                        {isApproved &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsApproved(false)}></button>
                            <ApproveList approveTx={approveTx} />
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>

              <div className={toggleTabState === 3 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Allowance</h3>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleAllowance}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">owner</h6>
                      </div>
                      <input
                        type="text"
                        name="owner"
                        className="input p-1"
                        placeholder="Owner address"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />

                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">spender</h6>
                      </div>
                      <input
                        type="text"
                        name="spender"
                        className="input p-1"
                        placeholder="Spender address"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-info"
                      >
                        Allowance
                      </button>
                      <div className="my-3">
                        {isAllowanceMsg &&
                          <div className="alert alert-dismissible alert-warning">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsAllowanceMsg(false)}></button>
                            Spender can spend this ETH amount:{" "}{allowanceAmount}{" "}
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>

              <div className={toggleTabState === 4 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Transfer From</h3>
                <hr />
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">transfer from</h6>
                  <form onSubmit={handleTransferFrom}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">sender</h6>
                      </div>
                      <input
                        type="text"
                        name="sender"
                        className="input p-1"
                        placeholder="Sender address"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">recipient</h6>
                      </div>
                      <input
                        type="text"
                        name="recipient"
                        className="input p-1"
                        placeholder="Recipient address"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to transfer"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Transfer from
                      </button>
                      <div className="my-4 mb-2">
                        {isTransferFrom &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsTransferFrom(false)}></button>
                            <strong>Well Done!</strong> Your transfer has been completed.
                          </div>
                        }
                        {errorTransferFrom &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorTransferFrom(false)}></button>
                            <strong>Error!</strong> Transfer amount exceeds balance.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Token Events */}
      <div className='container'>
        <div className='box-4'>
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-darkgrey">
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-info text-left">
                Recent ERC20 Token Transactions
              </h3>
              <div>
                <TxList txs={txs} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* DEX Wallet Header */}
      <header className='container-2'>
        <div className='box-1'>
          <div>
            <div className='m-4'>
              <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-info text-left">
                  DEX UI
                </h1>
                <p><small className="text-muted">Add ERC20 tokens into DEX, to trade. Deposit the amount tokens, deposit ETH to make transactions and withdraw tokens.</small> </p>
                <p><small className='text-secondary'>You must be login to Metamask or Coinbase Link Wallet.</small></p>
              </main>
            </div>
          </div>

        </div>
      </header>
      {/* DEX deposts/balances/add-token, etc...  */}
      <div className='container-3'>
        {/* add tokens */}
        <div className='box-1'>
          <div className='container'>
            <div className='bloc-tabs'>
              <button className={toggleTabState2 === 5 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs2(5)}>Add Ticker Symbol</button>
              <button className={toggleTabState2 === 6 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs2(6)}>Dex deposits</button>
              <button className={toggleTabState2 === 7 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs2(7)}>Deposit ETH</button>
              <button className={toggleTabState2 === 8 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs2(8)}>Withdraw</button>
            </div>

            <div className='content-tabs'>
              <div className={toggleTabState2 === 5 ? 'content active-content' : "content"}>
                <h4 className='text-muted'>Add token ticker/symbol to trade.</h4>
                <hr />
                <div className="card-body">
                  {/* get Dex add token */}
                  <form onSubmit={handleAddToken}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">add token to DEX</h6>
                      </div>
                      <input
                        type="bytes32"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Add Token
                      </button>
                      <div className="my-4 mb-2">
                        {addTokenSuccessMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert"
                              onClick={() => setAddTokenSuccessMsg(false)}></button>
                            <strong>Success!</strong> Your you added a token.
                          </div>
                        }

                        {errorAddToken &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorAddToken(false)}></button>
                            <strong>Oh snap!</strong> Token must be ERC20 and you must be the owner or log into Metamask or Coinbase Link Wallet. Also, make sure the token smart contract is logged in as well.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

                <div className='my-3'>
                  <div>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">list tokens</h6>
                      {/* get Dex add token */}
                      <form onSubmit={getAllTokensList}>
                        <footer className="p-4">
                          <button
                            type="submit"
                            className="btn btn-outline-info"
                          >
                            List All Tokens
                          </button>
                          <div className="my-4 mb-2">
                            {myTokenList}
                          </div>
                        </footer>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className={toggleTabState2 === 6 ? 'content active-content' : "content"}>
                <h4 className='text-muted'>Deposit token into DEX</h4>
                <hr />
                <div className="card-body">
                  {/* get Dex token deposits */}
                  <form onSubmit={handleDexTokenDeposit}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">deposit tokens into DEX</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to deposit"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">token symbol</h6>
                      </div>
                      <input
                        type="text"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Deposit Tokens
                      </button>
                      <div className="my-4 mb-2">
                        {depositSuccessMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setDepositSuccessMsg(false)}></button>
                            <strong>Success!</strong> Your deposit was executed.
                          </div>
                        }
                        {errorDexDeposit &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorDexDeposit(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Must be an ERC20 token or check allowance.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>

              <div className={toggleTabState2 === 7 ? 'content active-content' : "content"}>
                <h4 className='text-muted'>Deposit ETH to pay for trading</h4>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleDepositEth}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">deposit ETH to DEX</h6>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        className="input p-1"
                        placeholder="ETH Amount"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Deposit ETH
                      </button>
                      <div className="my-4 mb-2">
                        {depositEthSuccessMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setDepositEthSuccessMsg(false)}></button>
                            <strong>Success!</strong> Your deposit of {depositEthAmount} Ether was executed.
                          </div>
                        }

                        {errorDepositEth &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorDepositEth(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Token balance may be insufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

              </div>

              <div className={toggleTabState2 === 8 ? 'content active-content' : "content"}>
                <h4 className='text-muted'>Withdraw tokens from DEX< h6>Tokens will be withdrawn from this exchange to your wallet</h6></h4>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleWithDraw}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">widthraw tokens from DEX</h6>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        className="input p-1"
                        placeholder="Token Amount"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>

                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">token symbol</h6>
                      </div>
                      <input
                        type="bytes32"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Withdraw Tokens
                      </button>
                      <div className="my-4 mb-2">
                        {withDrawSuccessMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setWithDrawSuccessMsg(false)}></button>
                            <strong>Success!</strong> Your widthrawl of {withDrawAmountInfo} tokens was executed.
                          </div>
                        }
                        {errorDexWithdraw &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorDexWithdraw(false)}></button>
                            <strong>Oh snap!</strong> Token balance may be insufficient or token does not exist.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

              </div>

            </div>

          </div>

        </div>
        {/* get Dex balances */}
        <div className='box-3'>
          <div className='m-4'>
            <div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">ERC20 Token balances in DEX</h6>
                  <form onSubmit={getDexBalances}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">token symbol</h6>
                      </div>
                      <input
                        type="text"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-info"
                      >
                        Get Dex Balances
                      </button>
                    </footer>
                  </form>
                </div>
              </div>
              {/* return dex balances */}
              <div className="px-4">
                <div className="overflow-x-auto">
                  <table className="table w-full text-info">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>Token Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{dexBalanceInfo.address}</th>
                        <td>{dexBalanceInfo.ticker}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TRADING  */}
      <div className='container-4'>
        <div className='box-1'>
          <div>
            <div className='m-4'>
              <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-info text-left">
                  DEX TRADING
                </h1>
                <p><small className="text-muted">Limit sell and buy. Market sell and buy.</small> </p>
                <br />
                <h6 className='text-muted'>Price in ETH</h6>
              </main>
            </div>
          </div>

        </div>
      </div>
      {/* handle sell and buy  */}
      <div className='container-5'>
        <div className='box-1'>
          <div className='container'>
            <div className='bloc-tabs'>
              <button className={toggleTabState3 === 9 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs3(9)}>Limit Sell</button>
              <button className={toggleTabState3 === 10 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs3(10)}>Limit Buy</button>
              <button className={toggleTabState3 === 11 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs3(11)}>Market Sell</button>
              <button className={toggleTabState3 === 12 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs3(12)}>Market Buy</button>
            </div>

            <div className='content-tabs'>
              <div className={toggleTabState3 === 9 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Limit SELL Orders</h3>
                <hr />
                <div className="card-body">
                  {/* handle submit limt order */}
                  <form onSubmit={handleLimitOrderSell}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">ticker example: LINK, ETH, etc </h6>
                      </div>
                      <input
                        type="text"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount of tokens to sell</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to sell"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">Price per token</h6>
                      </div>
                      <input
                        type="text"
                        name="price"
                        className="input p-1"
                        placeholder="Token Price in ETH"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Create a limit SELL order
                      </button>
                      <div className="my-4 mb-2">
                        {isLimitSellMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsLimitSellMsg(false)}></button>
                            <strong>Well Done!</strong> Your limit sell order has been completed.
                          </div>
                        }

                        {errorLimitSell &&
                          <div className="alert alert-dismissible alert-warning">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorLimitSell(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again.  Your balance may be insufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

              </div>

              <div className={toggleTabState3 === 10 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Limit BUY Orders</h3>
                <hr />
                <div className="card-body">
                  {/* handle submit limt order */}
                  <form onSubmit={handleLimitOrderBuy}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">ticker example: LINK, ETH, etc </h6>
                      </div>
                      <input
                        type="text"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount of tokens to buy</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to buy"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">Price per token</h6>
                      </div>
                      <input
                        type="text"
                        name="price"
                        className="input p-1"
                        placeholder="Token Price in ETH"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                      >
                        Create a limit BUY order
                      </button>
                      <div className="my-4 mb-2">
                        {isLimitBuyMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsLimitBuyMsg(false)}></button>
                            <strong>Well Done!</strong> Your limit buy has been completed.
                          </div>
                        }

                        {errorLimitBuy &&
                          <div className="alert alert-dismissible alert-warning">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorLimitBuy(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your ETH balance may be insufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

              </div>

              <div className={toggleTabState3 === 11 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Market SELL Orders</h3>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleMarketOrderSell}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">ticker example: LINK, ETH, etc</h6>
                      </div>
                      <input
                        type="text"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount of tokens to sell</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to sell"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-warning"
                      >
                        Create a market SELL order
                      </button>
                      <div className="my-4 mb-2">
                        {isMarketSellMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsMarketSellMsg(false)}></button>
                            <strong>Well Done!</strong> Your market sell order has been completed.
                          </div>
                        }

                        {errorMarketSell &&
                          <div className="alert alert-dismissible alert-warning">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorMarketSell(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your balance may be insufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

              </div>

              <div className={toggleTabState3 === 12 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Market BUY Order</h3>
                <hr />
                <div className="card-body">
                  {/* handle submit limt order */}
                  <form onSubmit={handleMarketOrderBuy}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">ticker example: LINK, ETH, etc</h6>
                      </div>
                      <input
                        type="text"
                        name="ticker"
                        className="input p-1"
                        placeholder="Token Symbol"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">amount of tokens to buy</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="Amount to buy"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                      >
                        Create a market BUY order
                      </button>
                      <div className="my-4 mb-2">
                        {isMarketBuyMsg &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsMarketBuyMsg(false)}></button>
                            <strong>Well Done!</strong> Your market buy order has been completed.
                          </div>
                        }

                        {errorMarketBuy &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorMarketBuy(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your ETH balance may be insufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='box-2'>
          <div className='container-6'>
            <div className='m-4'>
              <div className='box-refresh'>
                <button className="btn btn-primary" onClick={refresh}>Refresh Trades</button>
              </div>
              <div className='container-1'>
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
      </div>
      <Footer />
    </>
  );
};

export default App;