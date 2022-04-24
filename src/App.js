import React from 'react';
import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import RealToken from "./artifacts/contracts/tokens.sol/RealToken.json";
import 'bootswatch/dist/slate/bootstrap.min.css';
import TxList from './components/Transactions/TxList.jsx';
import Dex from "./artifacts/contracts/Dex.sol/Dex.json";
//import SellOrders from './components/Transactions/SellOrders';
//import BuyOrders from './components/Transactions/BuyOrders';
import ApproveList from './components/Transactions/ApproveList';
import Header from './components/Header';
import Footer from './components/Footer';
import Token from './components/Token';
import DexTransact from './components/Dex/DexTransact';
import DexHeader from './components/Dex/DexHeader';
import TradingHeader from './components/Trading/TradingHeader';
import Trading from './components/Trading/Trading';
import { useWeb3React } from "@web3-react/core";
import { getContract } from './utils/utils';

// https://youtu.be/a0osIaAOFSE
// the complete guide to full stack ehtereum development - tutorial for beginners

// https://youtu.be/38WUVVoMZKM
// read/write/events

// ERC20 functions explained
//https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/#:~:text=The%20ERC%2D20%20standard%20allows,spend%20on%20behalf%20of%20owner%20.


//practice - Flexbox CSS in 20 minutes
//https://youtu.be/JJSoEo8JSnc
//const myTokenSymbol = ethers.utils.formatBytes32String("RETK");

// localhost
//dex deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
//Real Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

// robsten deployment
// dex deployed to: 0x71E33774EA49494aAfA8E96b0A793F03EE069a2b
// Real Token deployed to: 0xe4b6351Dc44f54e5CbbBe9008f06fA253001BcFb

// localhost test net
const tokenContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const dexContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


function App() {
  //const [contractAddress, setContractAddress] = useState("-"); 
  const [tokenContract, setTokenContract] = useState(null);
  const [dexContract, setDexContract] = useState(null);
  const [openWindowMsg, setOpenWindowMsg] = useState(false);

  const { library, account } = useWeb3React(); // import library

  useEffect(() => {
    if (library) {
      // to init a contract
      const token = getContract(tokenContractAddress, RealToken.abi, library, account);
      setTokenContract(token);
      //console.log("token:", token);

      const dex = getContract(dexContractAddress, Dex.abi, library, account);
      setDexContract(dex);
      //console.log("dex:", dex);
    } else {
      setOpenWindowMsg(true);
    }
  }, [account, library]);


  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
    user: "-",
    balance: "-"
  });

  /*
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  });
  */

  const [txs, setTxs] = useState([]);
  const [approveTx, setApproveTx] = useState([]);
  const [limitTx, setLimitTx] = useState([]);
  const [marketTx, setMarketTx] = useState([]);

  const [ethDexBalance, setEthDexBalance] = useState({
    address: "-",
    ethBal: "_"
  });

  const [errorTransfer, setErrorTransfer] = useState(false);
  const [errorTransferFrom, setErrorTransferFrom] = useState(false);

  const [errorAddToken, setErrorAddToken] = useState(false);
  const [errorDexDeposit, setErrorDexDeposit] = useState(false);
  const [errorDepositEth, setErrorDepositEth] = useState(false);
  const [errorDexWithdraw, setErrorDexWithdraw] = useState(false);

  const [errorLimitSell, setErrorLimitSell] = useState(false);
  const [errorLimitBuy, setErrorLimitBuy] = useState(false);

  const [errorMarketSell, setErrorMarketSell] = useState(false);
  const [errorMarketBuy, setErrorMarketBuy] = useState(false);


  // tx is complete and sends a visual message
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
  const [errorDepositEthMsg, setErrorDepositEthMsg] = useState(false)
  const [depositEthAmount, setDepositEthAmount] = useState("-");
  const [dexTokenTX, setDexTokenTx] = useState([])

  //const [isSellInfo, setIsSellInfo] = useState([]);
  //const [isBuyInfo, setIsBuyInfo] = useState([]);

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

    //event Transfer(address indexed from, address indexed to, uint256 value);
    if (contractInfo.address !== "-") {
      tokenContract?.on("Transfer", (from, to, amount, event) => {
        //console.log({ from, to, amount, event });
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
        //event.removeListener(); // Solve memory leak with this.
      });

      return () => {
        tokenContract.removeAllListeners("Transfer")
      }
    };
    // eslint-disable-next-line
  }, [contractInfo.address]);


  // APPROVE EVENTS
  useEffect(() => {
    if (contractInfo.address !== "-") {
      tokenContract?.on("Approval", (spender, event) => {
        //console.log({ spender, amount, event });
        setApproveTx(prevApprove => [
          ...prevApprove,
          {
            txHash: event.transactionHash,
            spender,
          }
        ]);
      });
      return () => {
        tokenContract.removeAllListeners("Approval");
      }
    };

    // eslint-disable-next-line
  }, [contractInfo.address]);



  // ORDERS
  useEffect(() => {
    //-----Limit------------
    dexContract?.on("LimitOrder", (trader, side, ticker, amount, price, event) => {
      console.log(trader, side, ticker, amount, price, event);

      setLimitTx(prevLimitTx => [
        ...prevLimitTx,
        {
          txHash: event.transactionHash,
          trader,
          side,
          ticker: ethers.utils.parseBytes32String(ticker),
          amount: String(amount),
          price: ethers.utils.formatEther(price),
        }
      ]);
      return () => {
        dexContract.removeAllListeners("LimitORder");
      }

    });
    //-----Market------------
    dexContract?.on("MarketOrder", (trader, side, ticker, amount, event) => {
      console.log(trader, side, ticker, amount, event);

      setMarketTx(prevMarketTx => [
        ...prevMarketTx,
        {
          txHash: event.transactionHash,
          trader,
          side,
          ticker: ethers.utils.parseBytes32String(ticker),
          amount: String(amount),
        }
      ]);
      return () => {
        dexContract.removeAllListeners("MarketOrder");
      }

    });

  }, [dexContract]);


  // ------------------GET ERC20 TOKEN CONTRACT -----------------------
  const handleGetTokenInfo = async (e) => {
    //e.preventDefault();
    try {
      //const data = new FormData(e.target);
      //const erc20 = getContract(data.get(contractAddress), RealToken.abi, library, account);
      const tokenName = await tokenContract.name();
      const tokenSymbol = await tokenContract.symbol();
      const totalSupply = await tokenContract.totalSupply();

      const balance = await tokenContract.balanceOf(account);
      const ethFormatBalance = ethers.utils.formatEther(balance);

      setContractInfo({
        //address: data.get(contractAddress),
        address: tokenContract.address,
        tokenName,
        tokenSymbol,
        totalSupply: ethers.utils.formatEther(totalSupply),
        user: account,
        balance: String(ethFormatBalance)
      });
      //setContractAddress(data); // this, in case I switch to a dynamic input field again
    } catch (error) {
      console.log("error", error);
    }
  };

  // Get ERC20 Token Contract Info
  useEffect(() => {
    handleGetTokenInfo();
    // eslint-disable-next-line
  }, [account]);

  /*
  console.log(
    "contractInfo address:",
    contractInfo.address,
    "name:", contractInfo.tokenName,
    "symbol:", contractInfo.tokenSymbol,
    "totalSupply:", contractInfo.totalSupply,
    "balanceInfo balance:", contractInfo.balance
  );
  */

  //--------- list of tokens in DEX ----------------
  useEffect(() => {
    const tokenListData = window.localStorage.getItem("token_list");
    setListOfTokens(JSON.parse(tokenListData));
    //console.log(tokenListData);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("token_list", JSON.stringify(listOfTokens));
  }, [listOfTokens]);


  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      const transaction = await tokenContract.transfer(data.get("recipient"), ethers.utils.parseEther(data.get("amount")));
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
      const transactionFrom = await tokenContract.transferFrom(data.get("sender"), data.get("recipient"), ethers.utils.parseEther(data.get("amount")));
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
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const signer = provider.getSigner();
      //const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      //approve infinity amount
      // 115792089237316195423570985008687907853269984665640564039457584007913129639935
      const transaction = await tokenContract.approve(data.get("spender"), ethers.utils.parseEther(data.get("amount")));
      await transaction.wait();
      //console.log("Success! -- approved");
      setIsApproved(true);
    } catch (error) {
      console.log(error);
      if (error) return alert("error, check address or re-set Metamask");

    }
  }

  const handleApproveDex = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      const data = new FormData(e.target);
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const signer = provider.getSigner();
      //const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      const transaction = await tokenContract.approve(dexContractAddress, ethers.utils.parseEther(data.get("amount")));
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
      const allowance = await tokenContract.allowance(data.get("owner"), data.get("spender"));
      console.log(allowance.toString());
      setIsAllowanceMsg(true);
      setAllowanceAmount(ethers.utils.formatEther(allowance));

      return allowance;

    } catch (error) {
      console.log(error);
      if (error) return alert("Input correct address");
    };

  };


  /////////////// DEX //////////////////
  // Get ERC20 token balances in DEX
  const getDexBalances = async () => {
    try {
      // get token list
      const allTokenList = await dexContract.getTokenListLength();
      //console.log("token list length:", allTokenList.toNumber());
      for (let i = 0; i < allTokenList; i++) {
        let tokenList = await dexContract.tokenList(i);
        //console.log("token list token:", ethers.utils.parseBytes32String(tokenList));
        const tickerBalance = await dexContract.balances(account,
          (tokenList));
        console.log("Dex Token Bal:", ethers.utils.formatEther(tickerBalance.toString()));
        setDexBalanceInfo(prevDexBal => [
          ...prevDexBal,
          {
            address: account,
            amount: ethers.utils.formatEther(tickerBalance),
            ticker: ethers.utils.parseBytes32String(tokenList),
          }
        ]);
      };
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    getDexBalances();
    // eslint-disable-next-line
  }, [account, dexTokenTX]);


  // Get only the ETH bal in DEX
  const getDexETH_Balance = async () => {
    try {
      const dexEthBal = await dexContract.balances(account, ethers.utils.formatBytes32String("ETH"));
      console.log("Dex ETH Bal:", ethers.utils.formatEther(dexEthBal.toString()));
      setEthDexBalance({
        address: account,
        ethBal: ethers.utils.formatEther(dexEthBal)
      });
      //return dexEthBal;
    } catch (error) {
      console.log("error", error);
    }
  };



  useEffect(() => {
    if (account) {
      getDexETH_Balance();
    }

    // eslint-disable-next-line
  }, [account, depositEthAmount]);



  const handleAddToken = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const addTokenTx = await dexContract.addToken(
        ethers.utils.formatBytes32String(data.get("ticker")), contractInfo.address
      );
      await addTokenTx.wait();
      //console.log("Add Token: ", addTokenTx);
      setAddTokenSuccessMsg(true);

      // get token list
      const allTokenList = await dexContract.getTokenListLength();
      //console.log("token list length:", allTokenList.toNumber());
      for (let i = 0; i < allTokenList; i++) {
        let tokenList = await dexContract.tokenList(i);
        //console.log("token list token:", ethers.utils.parseBytes32String(tokenList));
        setListOfTokens(prevTokens => [
          ...prevTokens,
          {
            id: uuidv4(),
            ticker: ethers.utils.parseBytes32String(tokenList)
          }
        ]);
      };
    } catch (error) {
      console.log("error", error);
      setErrorAddToken(true);
    };
  };

  // Deposit only ETH into DEX
  const handleDepositEth = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const depositEthTx = await dexContract.depositEth({ value: ethers.utils.parseEther(data.get("amount")) });
      await depositEthTx.wait();
      console.log("Deposit ETH: ", depositEthTx);
      //console.log("Deposit ETH: ", depositEthTx.value.toString());
      setDepositEthAmount(ethers.utils.formatEther(depositEthTx.value));
      //setDepositEthSuccessMsg(true);
    } catch (error) {
      console.log("error", error);
      //setErrorDepositEthMsg(true);
    };
  };


  // DEPOSIT ERC20 TOKENS INTO DEX
  const handleDexTokenDeposit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const dexDepositTx = await dexContract.deposit(
        ethers.utils.parseEther(data.get("amount")), ethers.utils.formatBytes32String(data.get("ticker"))
      );
      await dexDepositTx.wait();
      console.log("Dex deposit tx: ", dexDepositTx);
      setDexTokenTx(dexDepositTx);
      setDepositSuccessMsg(true);
    } catch (error) {
      console.log("error", error);
      setErrorDexDeposit(true);
    };
  };

  // WITHDRAW ERC20 TOKENS FROM DEX

  const handleWithDraw = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const withdrawTx = await dexContract.withdraw(
        ethers.utils.parseEther(data.get("amount")), ethers.utils.formatBytes32String(data.get("ticker"))
      );
      await withdrawTx.wait();
      console.log("withdraw: ", withdrawTx);

      setWithDrawSuccessMsg(true);
      //setWithDrawAmountInfo(ethers.utils.formatEther(withdrawTx.value));
      setWithDrawAmountInfo(data.get(("amount")));
    } catch (error) {
      console.log("error", error);
      setErrorDexWithdraw(true);
    }
  };


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

      window.location.reload();

    } catch (error) {
      console.log("error", error);
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

      window.location.reload();

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

      window.location.reload();

    } catch (error) {
      console.log("error", error);
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

      window.location.reload();

    } catch (error) {
      console.log("error", error);
      setErrorMarketBuy(true);
    };
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


  return (
    <>
      <div className='container'>
        <Header
          openWindowMsg={openWindowMsg}
          setOpenWindowMsg={setOpenWindowMsg}
        />
      </div>

      <Token
        isTransferMsg={isTransferMsg}
        setIsTransferMsg={setIsTransferMsg}
        transfer={transfer}
        isApproved={isApproved}
        setIsApproved={setIsApproved}
        isAllowanceMsg={isAllowanceMsg}
        setIsAllowanceMsg={setIsAllowanceMsg}
        allowanceAmount={allowanceAmount}
        isTransferFrom={isTransferFrom}
        setIsTransferFrom={setIsTransferFrom}
        toggleTabs={toggleTabs}
        toggleTabState={toggleTabState}
        errorTransfer={errorTransfer}
        setErrorTransfer={setErrorTransfer}
        ApproveList={ApproveList}
        approveTx={approveTx}
        errorTransferFrom={errorTransferFrom}
        setErrorTransferFrom={setErrorTransferFrom}
        handleGetTokenInfo={handleGetTokenInfo}
        handleTransfer={handleTransfer}
        handleApprove={handleApprove}
        handleAllowance={handleAllowance}
        handleTransferFrom={handleTransferFrom}
        handleApproveDex={handleApproveDex}
        contractInfo={contractInfo}
        tokenContract={tokenContract}
      />

      {/* 
       balanceInfo={balanceInfo}
      getMyBalance={getMyBalance}
       contractAddress={contractAddress}

        */}

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
                <ApproveList approveTx={approveTx} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DexHeader />

      <DexTransact
        errorAddToken={errorAddToken}
        errorDexDeposit={errorDexDeposit}
        errorDepositEth={errorDepositEth}
        errorDexWithdraw={errorDexWithdraw}
        dexBalanceInfo={dexBalanceInfo}
        withDrawSuccessMsg={withDrawSuccessMsg}
        withDrawAmountInfo={withDrawAmountInfo}
        addTokenSuccessMsg={addTokenSuccessMsg}
        depositEthSuccessMsg={depositEthSuccessMsg}
        depositEthAmount={depositEthAmount}
        toggleTabState2={toggleTabState2}
        depositSuccessMsg={depositSuccessMsg}
        setDepositSuccessMsg={setDepositSuccessMsg}
        handleDepositEth={handleDepositEth}
        toggleTabs2={toggleTabs2}
        handleAddToken={handleAddToken}
        setDepositEthSuccessMsg={setDepositEthSuccessMsg}
        setAddTokenSuccessMsg={setAddTokenSuccessMsg}
        setErrorAddToken={setErrorAddToken}
        handleDexTokenDeposit={handleDexTokenDeposit}
        setErrorDexDeposit={setErrorDexDeposit}
        setErrorDepositEth={setErrorDepositEth}
        handleWithDraw={handleWithDraw}
        setErrorDexWithdraw={setErrorDexWithdraw}
        getDexBalances={getDexBalances}
        setWithDrawSuccessMsg={setWithDrawSuccessMsg}
        myTokenList={myTokenList}
        errorDepositEthMsg={errorDepositEthMsg}
        setErrorDepositEthMsg={setErrorDepositEthMsg}
        ethDexBalance={ethDexBalance}
      />
      {/*
        getAllTokensList={getAllTokensList}
           
 
       */}

      <TradingHeader />

      <Trading
        toggleTabState3={toggleTabState3}
        toggleTabs3={toggleTabs3}
        handleLimitOrderSell={handleLimitOrderSell}
        isLimitSellMsg={isLimitSellMsg}
        setIsLimitSellMsg={setIsLimitSellMsg}
        errorLimitSell={errorLimitSell}
        setErrorLimitSell={setErrorLimitSell}
        handleLimitOrderBuy={handleLimitOrderBuy}
        isLimitBuyMsg={isLimitBuyMsg}
        setIsLimitBuyMsg={setIsLimitBuyMsg}
        errorLimitBuy={errorLimitBuy}
        setErrorLimitBuy={setErrorLimitBuy}
        handleMarketOrderBuy={handleMarketOrderBuy}
        isMarketBuyMsg={isMarketBuyMsg}
        setIsMarketBuyMsg={setIsMarketBuyMsg}
        errorMarketBuy={errorMarketBuy}
        setErrorMarketBuy={setErrorMarketBuy}
        handleMarketOrderSell={handleMarketOrderSell}
        isMarketSellMsg={isMarketSellMsg}
        setIsMarketSellMsg={setIsMarketSellMsg}
        errorMarketSell={errorMarketSell}
        setErrorMarketSell={setErrorMarketSell}

        limitTx={limitTx}
        setLimitTx={setLimitTx}
        marketTx={marketTx}
        setMarketTx={setMarketTx}
      />
      {/*
      sellList={sellList}
          buyList={buyList}
          sellList={sellList}
          refresh={refresh}
       */}

      <Footer />
    </>
  );
};

export default App;