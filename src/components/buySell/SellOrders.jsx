import React from 'react';

function SellOrders({ sells }) {

  if (sells.length === 0) return null;

  return (
    <div className="alert alert-dismissible alert-primary text-secondary">
       <div>
        <strong>Id:</strong>{" "}{sells.id}
      </div>
      <div>
        <strong>Trader:</strong>{" "}{sells.trader}
      </div>
      <div>
        <strong>Ticker:</strong>{" "}{sells.ticker}
      </div>
      <div>
        <strong>Amount:</strong>{" "}{sells.amount}
      </div>
      <div className='text-danger'>
        <strong>Price:</strong>{" "}{sells.price}
      </div>
      <div>
        <strong>Filled:</strong>{" "}{sells.filled}
      </div>
    </div>
  )
}

export default SellOrders;