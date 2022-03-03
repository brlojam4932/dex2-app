import React from 'react';
import { ethers } from 'ethers';
import './App.css';
import { useState, useEffect } from 'react';
import RealToken from "./artifacts/contracts/Tokens.sol/RealToken.json";
import 'bootswatch/dist/slate/bootstrap.min.css';
import TxList from './components/TxList.jsx';

import Dex from "./artifacts/contracts/Dex.sol/Dex.json";

// https://youtu.be/a0osIaAOFSE
// the complete guide to full stack ehtereum development - tutorial for beginners

//https://youtu.be/38WUVVoMZKM
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
  const [error, setError] = useState(false);
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
  })

  const [dexBalanceInfo, setDexBalanceInfo] = useState({
    address: "-",
    ticker: "-"
  });


  const [isApproved, setIsApproved] = useState(false);
  const [allowanceAmount, setAllowanceAmount] = useState();
  const [isAllowanceMsg, setIsAllowanceMsg] = useState(false);
  const [isTransferFrom, setIsTransferFrom] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);

  //const [dexContractAddress, setDexContractAddress] = useState("-");


  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(
        contractInfo.address,
        RealToken.abi,
        provider
      );

      //event Transfer(address indexed from, address indexed to, uint256 value);

      erc20.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount)
          }
        ]);
      });
      setContractListened(erc20);

      return () => {
        contractListened.removeAllListeners();
      };

    }
  }, [contractInfo.address]);


  // Get token info: name, symbol and totalSupply
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
        totalSupply,
      });
      setContractAddress(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  /*
    const handleGetDex = async (e) => {
      e.preventDefault()
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log({ provider })
        const dexContract = new ethers.Contract(dexContractAddress, Dex.abi, provider);
        console.log(dexContract.address);
      }    
    };
    */


  // dex.addToken(ethers.utils.formatBytes32String("RETK"), realToken.address)
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
      console.log("Add Token: ", addTokenTx);

    } catch (error) {
      console.log("error", error);
      if (error) return alert("error...check correct address");
    };
  };


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
        ticker: String(tickerBalance)
      });
    } catch (error) {
      console.log("error", error);
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
        1, ethers.utils.formatBytes32String(data.get("ticker")), data.get("amount"), data.get("price")
      );
      await limitOrderSellTx.wait();
      console.log('limit SELL order success', limitOrderSellTx);

    } catch (error) {
      console.log("error", error);
      if (error) return alert("error...check token balance");
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

    } catch (error) {
      console.log("error", error);
      if(error) return alert("error...check Eth amount");
    };
  };


  //dex.connect(addr1).deposit(50, ethers.utils.formatBytes32String("RETK"));
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
        data.get("amount"), ethers.utils.formatBytes32String(data.get("ticker"))
      );
      await dexDepositTx.wait();
      console.log("Dex deposit tx: ", dexDepositTx);

    } catch (error) {
      console.log("error", error);
      if (error) return alert("error...check token balance");
    };
  };

  // balance: ethers.utils.formatEther(contractBalance.toString()),
  //{value: ethers.utils.formatEther(amountETH, "ether")}
  //const depositEthTx = await dex.depositEth({ value: 3000 })
  const handleDepositEth = async (e) => {
    e.preventDefault();
    try {
      if (!window.ethereum) return alert("Please install or sign-in to Metamask");
      //const data = FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, signer);
      await provider.send("eth_requestAccounts", []);
      const depositEthTx = await dex.depositEth({ value: 5000 });
      await depositEthTx.wait();
      console.log("Deposit ETH: ", depositEthTx);
      console.log("Deposit ETH: ", depositEthTx.value.toString());
      
    } catch (error) {
      console.log("error", error);
    };
  };

    // check order book, SELL side, before trade
  //const orderbookBefore = await dex.getOrderBook(ethers.utils.formatBytes32String("RETK"), 1)
  //console.log("Orderbook length, SELL, Before: ", orderbookBefore.length); 

  const handleGetOrderBookSell = async (e) => {
    e.preventDefault();
    try {
      if(!window.ethereum) return alert("Please install or sign-in to Metamask");
      //const data = FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //await provider.send("eth_requestAccounts", []);
      //const signer = provider.getSigner();
      const dex = new ethers.Contract(dexContractAddress, Dex.abi, provider);  
      const signer = provider.getSigner();
      const owner = await signer.getAddress();
      console.log(owner); 

      const orderBookSell = await dex.getOrderBook(ethers.utils.formatBytes32String("RETK"), 1);
     // console.log(data);
      console.log("Orderbook length, SELL: ", orderBookSell.length); 

      for (let i = 0; i < orderBookSell.length; i++){
        let ticker = orderBookSell[i]["ticker"];
        let amount = orderBookSell[i]["amount"];
        let price = ethers.utils.formatEther(orderBookSell[i]["price"]);
        console.log("Symbol: ", ticker, "Amount: ", amount.toString(), "Price: ", price.toString());
        }
      
      
    } catch (error) {
      console.log("error", error);
    }
  }
  // setBuyerBalance(ethers.utils.formatEther(contractBuyerBalance));
  //ethers.utils.formatUnits(balance, 18)
  // function balanceOf(address account) external view returns (uint256)
  const getMyBalance = async () => {
    if (!window.ethereum) return alert("Please install or sign-in to Metamask");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, provider);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      // balance: ethers.utils.formatEther(contractBalance.toString()),
      const balance = await erc20.balanceOf(signerAddress);

      setBalanceInfo({
        address: signerAddress,
        balance: String(balance)
      });
    } catch (error) {
      console.log("error", error);
    }
  };


  //function transfer(address recipient, uint256 amount) external returns (bool);

  const handleTransfer = async (e) => {
    if (!window.ethereum) return alert("Please install or sign-in to Metamask");
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      await provider.send("eth_requestAccounts", []);
      const transaction = await erc20.transfer(data.get("recipient"), data.get("amount"));
      await transaction.wait();
      console.log('Success! -- recipient recieved amount');
      setIsTransfer(true);
    } catch (error) {
      console.log(error);
      //if (error) return alert('transfer amount exceeds balance');
      setError(true);
    };

  };


  // function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  // address a, b & c -> a is the sender, b is the spender, c is the recipient
  // address b can send to address c on a's behalf

  const handleTransferFrom = async (e) => {
    e.preventDefault();
    if (!window.ethereum) return alert("Please install or sign-in to Metamask");
    try {
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      await provider.send("eth_requestAccounts", [])
      const transactionFrom = await erc20.transferFrom(data.get("sender"), data.get("recipient"), data.get("amount"));
      await transactionFrom.wait();
      console.log("transferFrom -- success");
      setIsTransferFrom(true);
    } catch (error) {
      console.log(error);
      setError(true);
      //if (error) return alert("transfer from amount exceeds balance");
    };

  };


  //function approve(address spender, uint256 amount) external returns (bool);
  // address a, b & c -> address a approves address b, the spender

  const handleApprove = async (e) => {
    e.preventDefault();
    if (!window.ethereum) return alert("Please install or sign-in to Metamask");
    try {
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, RealToken.abi, signer);
      const transaction = await erc20.approve(data.get("spender"), data.get("amount"));
      await transaction.wait();
      //console.log("Success! -- approved");
      setIsApproved(true);
    } catch (error) {
      console.log(error);
      if (error) return alert("error, make sure is a different address other than your own");
    }
  }


  // function allowance(address owner, address spender) external view returns (uint256);
  // address a is owner and address b is the spender -> checks the balance owner allows spender to spend

  const handleAllowance = async (e) => {
    e.preventDefault();
    try {
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
      setAllowanceAmount(allowance.toString());

      return allowance;

    } catch (error) {
      console.log(error);
      if (error) return alert("Input correct address");
    };

    /////////////// DEX //////////////////

  };
  //createLimitOrder(1, ethers.utils.formatBytes32String("RETK"), 1, 300)
  return (
    <>
      {/* ERC20 token info/get balance/tx/approve/allowance/txfer-from/receipts */}
      <div className='container-1'>
        <div className='box-1'>
          <form className="m-4" onSubmit={handleGetTokenInfo}>
            <div className="credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-darkgrey">
              <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-info text-left">
                  Smart Contract UI
                </h1>
                <p><small className="text-muted">Read from a smart contract, approve, transfer, transfer from and recieve transaction messages from the blockchain.</small> </p>
                <br />
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
                <div className="overflow-x-auto">
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
                <div className="overflow-x-auto">
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
            </div>
          </form>
        </div>
        <div className='box-2'>
          {/* Transactions */}
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-darkgrey">
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-info text-left">
                Transactions / Approve
              </h3>
              {/* transfer */}
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">transfer</h6>
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
                        className="btn btn-outline-info"
                      >
                        Transfer
                      </button>
                      <div className="my-4 mb-2">
                        {isTransfer &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsTransfer(false)}></button>
                            <strong>Well Done!</strong> Your transfer has been completed.
                          </div>
                        }

                        {error &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setError(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your balance must be sufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>
              <br />
              {/* approve */}
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">approve</h6>
                  <form onSubmit={handleApprove}>
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
                        className="btn btn-outline-info"
                      >
                        Approve
                      </button>
                      <div className="my-4 mb-2">
                        {isApproved &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsApproved(false)}></button>
                            <strong>Well Done!</strong> You have successfully approved spender.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>
              <br />
            </div>
          </div>

        </div>

        <div className='box-3'>
          {/* Transactions */}
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-darkgrey">
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-info text-left">
                Allowance / Transfer From
              </h3>
              <br />
              {/* allowance */}
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">allowance</h6>
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
                            Spender can spend this amount:{" "}{allowanceAmount}{" "}
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>
              <br />
              {/* transfer from */}
              <div className="card">
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
                        className="btn btn-outline-info"
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
                        {error &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setError(false)}></button>
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

        <div className='box-4'>
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-darkgrey">
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-info text-left">
                Recent Transactions
              </h3>
              <div>
                <TxList txs={txs} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DEX Header */}
      <div className='container-2'>
        <div className='box-1'>
          <div>
            <div className='m-4'>
              <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-info text-left">
                  DEX UI
                </h1>
                <p><small className="text-muted">Read from a smart contract, approve, transfer, transfer from and recieve transaction messages from the blockchain.</small> </p>
                <br />
              </main>
            </div>
          </div>

        </div>
      </div>
      {/* DEX deposts/balances/add-token, etc...  */}             
      <div className='container-3'>
        <div className='box-1'>
          <div className="m-4">
            <div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">add tokens</h6>
                  {/* get Dex add token */}
                  <form onSubmit={handleAddToken}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">add token to DEX</h6>
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
                        Add Token
                      </button>
                    </footer>
                  </form>
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">deposit Eth</h6>
                  {/* get Dex deposit Eth */}
                  <form onSubmit={handleDepositEth}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">deposit ETH to DEX</h6>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        className="input p-1"
                        placeholder="ETH Amount"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-info"
                      >
                        Deposit ETH
                      </button>
                    </footer>
                  </form>
                </div>
              </div>
            </div>
            <br />

            <div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">get orderbook sell orders</h6>
                  {/* get Dex order book sell */}
                  <form onSubmit={handleGetOrderBookSell}>
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
                        Get Orderbook Sell Orders
                      </button>
                    </footer>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div className='box-2'>
          <div className='m-4'>
            <div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">dex deposits</h6>
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
                        className="btn btn-outline-info"
                      >
                        Deposit Tokens
                      </button>
                    </footer>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className='box-3'>
          <div className='m-4'>
            <div>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">dex balances</h6>
                  {/* get Dex balances */}
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
              <br />

            </div>
          </div>
        </div>
      </div>
      {/* DEX market/limit orders  */}               
      <div className='container-4'>
        <div className='box-1'>
          {/* Limit Order Transactions */}
          <div>
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-info text-left">
                Limit Orders
              </h3>
              {/* Limit Orders */}
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Limit Order</h6>
                  {/* handle submit limt order */}
                  <form onSubmit={handleLimitOrderSell}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">ticker example: BTC </h6>
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
                        placeholder="Token Price"
                        style={{ background: "#1f1f1f", border: "1px solid grey", borderRadius: "4px", color: "white" }}
                      />
                    </div>
                    <footer className="p-4">
                      <button
                        type="submit"
                        className="btn btn-outline-info"
                      >
                        Create a limit SELL order
                      </button>
                      <div className="my-4 mb-2">
                        {isTransfer &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsTransfer(false)}></button>
                            <strong>Well Done!</strong> Your transfer has been completed.
                          </div>
                        }

                        {error &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setError(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your balance must be sufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
        <div className='box-2'>
          {/* Market Order Transactions */}
          <div>
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-info text-left">
                Market Orders
              </h3>
              {/* Market Orders */}
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Market Order</h6>
                  {/* handle submit limt order */}
                  <form onSubmit={handleMarketOrderBuy}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">ticker example: BTC</h6>
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
                        className="btn btn-outline-info"
                      >
                        Create a market BUY order
                      </button>
                      <div className="my-4 mb-2">
                        {isTransfer &&
                          <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsTransfer(false)}></button>
                            <strong>Well Done!</strong> Your transfer has been completed.
                          </div>
                        }

                        {error &&
                          <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setError(false)}></button>
                            <strong>Oh snap!</strong> and try submitting again. Your balance must be sufficient.
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>
              <br />

            </div>
          </div>
        </div>
      </div>

    </>


  );


}

export default App;

