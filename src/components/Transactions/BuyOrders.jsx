import React from 'react'

function BuyOrders({ orders }) {
  return (
    <div className="alert alert-dismissible alert-primary text-secondary">
      <div>
        <strong>Id:</strong>{" "}{orders.id}
      </div>
      <div> 
        <strong>Trader:</strong>{" "}{orders.trader}
      </div>
      <div>
        <strong>Ticker:</strong>{" "}{orders.ticker}
      </div>
      <div>
        <strong>Amount:</strong>{" "}{orders.amount}
      </div>
      <div className='text-success'>
        <strong>Price:</strong>{" "}{orders.price}
      </div>
      <div>
        <strong>Filled:</strong>{" "}{orders.filled}
      </div>
    </div>
  )
}

export default BuyOrders;