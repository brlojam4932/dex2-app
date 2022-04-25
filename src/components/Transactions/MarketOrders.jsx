import React from 'react';


function MarketOrders({ marketTx }) {

  if (marketTx === 0) return null;

  return (
    <>
    {marketTx.map((market, index) => (
      <div key={index} className="alert alert-dismissible alert-primary">
      <div className='text-secondary'>
      <strong>Side:</strong>{market.side}
      </div>
      <div className='text-secondary'>
      <strong>Trader:</strong>{market.trader}
      </div>
      <div className='text-secondary'>
      <strong>Symbol:</strong> {market.ticker}
      </div>
      <div>
         <strong>Amount:</strong>{market.side === 0 ? 
         (<p className='text-success'>{market.amount}</p>) 
         : 
         (<p className='text-warning'>{market.amount}</p>)
         }
        </div>
      </div>
    ))}
    </>
  )
}

export default MarketOrders