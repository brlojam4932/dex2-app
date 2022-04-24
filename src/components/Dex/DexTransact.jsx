import React from 'react';
import DexBalances from '../Transactions/DexBalances';
// DEX wallet for deposits, withdraw, token list, balances
import styled from 'styled-components';

export const Wrapper3 = styled.section`
padding: 19px;
margin: 17px;
`

function DexTransact({ 
  errorAddToken,
  errorDexDeposit,
  errorDexWithdraw,
  dexBalanceInfo,
  withDrawSuccessMsg,
  withDrawAmountInfo,
  addTokenSuccessMsg,
  depositEthSuccessMsg,
  depositEthAmount,
  toggleTabState2,
  toggleTabs2,
  handleAddToken,
  setAddTokenSuccessMsg,
  setErrorAddToken,
  myTokenList,
  handleDexTokenDeposit,
  handleDepositEth,
  setErrorDexDeposit,
  handleWithDraw,
  setErrorDexWithdraw,
  depositSuccessMsg,
  setDepositSuccessMsg,
  setDepositEthSuccessMsg,
  setErrorDepositEth,
  setWithDrawSuccessMsg,
  errorDepositEthMsg,
  ethDexBalance
}) {
  return (
    <>
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
                <h4 className='text-muted'>Add token to trade</h4>
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
                      <h6 className="card-subtitle mb-2 text-info">Token List</h6>
                      <div className="my-4 mb-2">
                            {myTokenList}
                          </div>
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
                            <strong>Oh snap!</strong>Must be an ERC20 token or must be approved, check allowance.
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

                        {errorDepositEthMsg &&
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
                <h4 className='text-muted'>Withdraw tokens from DEX</h4>
                <small className='text-muted'>Tokens will be withdrawn from this exchange to your wallet</small>
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
                  <h6 className="card-subtitle mb-2 text-muted">DEX Token Balances</h6>
                </div>
                <Wrapper3 className='text-info'>
            <div>
            <strong>Address:</strong> {ethDexBalance.address}         
            </div>
            <div>
            <strong>Amount:</strong> {ethDexBalance.ethBal} ETH
            </div>
            <DexBalances dexBalanceInfo={dexBalanceInfo}/>
          </Wrapper3>
            </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DexTransact;