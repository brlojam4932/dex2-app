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
                <p><small className="text-success">Side 0 is a BUY and Side 1 is a SELL</small> </p>
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