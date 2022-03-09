import React from 'react';

function SellOrders({ sellOrders }) {
  return (
    <div className="alert alert-dismissible alert-success">
       <div>
        <strong>Id:</strong>{" "}{sellOrders.id}
      </div>
      <div>
        <strong>Trader:</strong>{" "}{sellOrders.trader}
      </div>
      <div>
        <strong>Side:</strong>{" "}{sellOrders.side}
      </div>
      <div>
        <strong>Ticker:</strong>{" "}{sellOrders.ticker}
      </div>
      <div>
        <strong>Amount:</strong>{" "}{sellOrders.amount}
      </div>
      <div>
        <strong>Price:</strong>{" "}{sellOrders.price}
      </div>
      <div>
        <strong>Filled:</strong>{" "}{sellOrders.filled}
      </div>
    </div>
  )
}

export default SellOrders