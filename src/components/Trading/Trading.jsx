import React from 'react';
import LimitOrders from '../Transactions/LimitOrders';
import MarketOrders from '../Transactions/MarketOrders';
// limit/market buys and sells and orderbook printout

function Trading({
  toggleTabState3,
  toggleTabs3,
  handleLimitOrderSell,
  isLimitSellMsg,
  setIsLimitSellMsg,
  errorLimitSell,
  setErrorLimitSell,
  handleLimitOrderBuy,
  isLimitBuyMsg,
  setIsLimitBuyMsg,
  errorLimitBuy,
  setErrorLimitBuy,
  handleMarketOrderBuy,
  isMarketBuyMsg,
  setIsMarketBuyMsg,
  errorMarketBuy,
  setErrorMarketBuy,
  handleMarketOrderSell,
  isMarketSellMsg,
  setIsMarketSellMsg,
  errorMarketSell,
  setErrorMarketSell,
  limitTx,
  marketTx,
  refresh

}) {
  return (
    <>
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
              <div className='container'>
                <div className='box-sell'>
                  <div className='card'>
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-secondary">LIMIT ORDERS</h6>
                      <div className="px-4">
                        <LimitOrders limitTx={limitTx} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='box-buy'>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-secondary">MARKET ORDERS</h6>
                      <div className="px-4" >
                        <MarketOrders marketTx={marketTx}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Trading;