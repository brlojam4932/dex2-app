import React from 'react';

function SellOrders({ order }) {
  return (
    <div className="alert alert-dismissible alert-success">
      <div>
        <strong>Trader:</strong>{" "}{order.trader}
      </div>
      <div>
        <strong>Side:</strong>{" "}{order.side}
      </div>
      <div>
        <strong>Ticker:</strong>{" "}{order.ticker}
      </div>
      <div>
        <strong>Amount:</strong>{" "}{order.amount}
      </div>
      <div>
        <strong>Price:</strong>{" "}{order.price}
      </div>
      <div>
        <strong>Filled:</strong>{" "}{order.filled}
      </div>
    </div>
  )
}

export default SellOrders