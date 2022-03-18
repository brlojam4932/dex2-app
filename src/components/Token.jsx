import React from 'react';
// ERC20 token transfer, approve, transferFrom 

function Token({
  handleGetTokenInfo,
  getMyBalance,
  balanceInfo,
  handleTransfer,
  isTransferMsg,
  setIsTransferMsg,
  transfer,
  handleApprove,
  isApproved,
  setIsApproved,
  handleAllowance,
  isAllowanceMsg,
  setIsAllowanceMsg,
  allowanceAmount,
  handleTransferFrom,
  isTransferFrom,
  setIsTransferFrom,
  contractAddress,
  contractInfo,
  toggleTabs,
  toggleTabState,
  errorTransfer,
  setErrorTransfer,
  ApproveList,
  approveTx,
  errorTransferFrom,
  setErrorTransferFrom,
  handleApproveDex
  
 }) {

  
  return (
    <>
     {/* ERC20 token info/get balance/tx/approve/allowance/txfer-from/receipts */}
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
                  className="btn btn-outline-danger"
                >
                  LOGIN / Get my balance
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
              <button className={toggleTabState === 5 ? 'tabs active-tabs' : "tabs"} onClick={() => toggleTabs(5)}>Approve DEX</button>
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

              <div className={toggleTabState === 5 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Approve DEX</h3>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleApproveDex}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">approve this DEX</h6>
                      </div>
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
                          <div className="alert alert-dismissible alert-primary">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsApproved(false)}></button>
                            <ApproveList approveTx={approveTx} />
                          </div>
                        }
                      </div>
                    </footer>
                  </form>
                </div>
              </div>

              <div className={toggleTabState === 2 ? 'content active-content' : "content"}>
                <h3 className='text-muted'>Approve Spender</h3>
                <small className='text-muted'>Approve another address to spend your tokens</small>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleApprove}>
                    <div className="my-3">
                      <div>
                        <h6 className="card-subtitle mb-2 text-muted">approve the spender</h6>
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
                        className="btn btn-outline-warning"
                      >
                        Approve Spender
                      </button>
                      <div className="my-4 mb-2">
                        {isApproved &&
                          <div className="alert alert-dismissible alert-primary">
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
                <small className='text-muted'>Check the allowance amount between your Metamask or Coinbase Link address and the spender, like this DEX</small>
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

   
    </>
 
  )
}

export default Token