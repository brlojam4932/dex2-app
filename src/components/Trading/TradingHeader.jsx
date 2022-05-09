import React from 'react';

function TradingHeader() {
  return (
    <>
       {/* TRADING  */}
       <header className='container-4'>
        <div className='box-1'>
          <div>
            <div className='m-4'>
              <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-info text-left">
                  DEX TRADING
                </h1>
                <p><small className="text-muted">First, the symbol or tiker of a token like DAI must be added from a Metamask account. Then, once can deposit an amount. The DEX needs to be approved by the DEX wallet at the top of the Dapp. ETH must also be deposited into the DEX.</small></p>
                <p><small className="text-muted">In the DEX trading section, one can make sell and buy orders. Trades and history should appear or refresh the page.</small></p>
                <p><small style={{color: "white"}}>Side 0 is a BUY and Side 1 is a SELL</small> </p>
                <br />
                <h6 className='text-muted'>Prices in ETH</h6>
              </main>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default TradingHeader;