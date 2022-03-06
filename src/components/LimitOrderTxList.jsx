import React from 'react';

function limitOrderTxList({ limitOrderTxs } ) {

  if (limitOrderTxs.length === 0) return null;

  return (
    <>
        {limitOrderTxs.map((orders, index) => (
      <div key={index} className="alert alert-dismissible alert-secondary">
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
      </div>
    ))}
    </>

  )
}

export default limitOrderTxList