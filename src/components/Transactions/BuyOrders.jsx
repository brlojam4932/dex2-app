import React from 'react'

function BuyOrders({ buys }) {

  if (buys.length === 0) return null;

  return (
    <div className="alert alert-dismissible alert-primary text-secondary">
      <div>
        <strong>Id:</strong>{" "}{buys.id}
      </div>
      <div> 
        <strong>Trader:</strong>{" "}{buys.trader}
      </div>
      <div>
        <strong>Ticker:</strong>{" "}{buys.ticker}
      </div>
      <div>
        <strong>Amount:</strong>{" "}{buys.amount}
      </div>
      <div className='text-success'>
        <strong>Price:</strong>{" "}{buys.price}
      </div>
      <div>
        <strong>Filled:</strong>{" "}{buys.filled}
      </div>
    </div>
  )
}

export default BuyOrders;