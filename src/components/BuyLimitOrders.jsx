import React from 'react'

function BuyLimitOrders({ orders }) {
  return (
    <div className="alert alert-dismissible alert-danger">
      <div>
        <strong>Id:</strong>{" "}{orders.id}
      </div>
      <div>
        <strong>Trader:</strong>{" "}{orders.trader}
      </div>
      <div>
        <strong>Side:</strong>{" "}{orders.side}
      </div>
      <div>
        <strong>Ticker:</strong>{" "}{orders.ticker}
      </div>
      <div>
        <strong>Amount:</strong>{" "}{orders.amount}
      </div>
      <div>
        <strong>Price:</strong>{" "}{orders.price}
      </div>
      <div>
        <strong>Filled:</strong>{" "}{orders.filled}
      </div>
    </div>
  )
}

export default BuyLimitOrders;