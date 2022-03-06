import React from 'react';

function MarketOrderTxList({ marketOrderTxs }) {

  if (marketOrderTxs.length === 0) return null;

  return (
    <>
      {marketOrderTxs.map((orders, index) => (
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

        </div>
      ))}
    </>
  )
}

export default MarketOrderTxList