import React from 'react'

function Token({
  handleGetTokenInfo,
  getMyBalance,
  balanceInfo,
  handleTransfer,
  isTransferMsg,
  setIsTransferMsg,
  transfer,
  error,
  setError,
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
  txs,
  contractAddress,
  contractInfo,
  TxList


 }) {

  
  return (
    <div className='container-1'>
    <div className='box-1'>
      <form className="m-4" onSubmit={handleGetTokenInfo}>
        <div className="credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-darkgrey">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-info text-left">
              ERC20 Smart Contract Token UI
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
                    {isTransferMsg &&
                      <div className="alert alert-dismissible alert-success">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setIsTransferMsg(false)}></button>
                        <strong>Well Done!</strong> Your transfer amount of {transfer} tokens has been completed.
                      </div>
                    }

                    {error &&
                      <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setError(false)}></button>
                        <strong>Oh snap!</strong> and try submitting again. Your balance may be insufficient.
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
                        Spender can spend this ETH amount:{" "}{allowanceAmount}{" "}
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
  )
}

export default Token