import React from 'react';
//import { useEffect } from "react";

function limitOrderTxList({ limitOrderTxs }) {

  if (limitOrderTxs.length === 0) return null;

  const [isSide, setIsSide] = (false);

  const side2 = limitOrderTxs[0].side;
  
  const sideFunction = () => {
    for (let i = 0; i < side2.length; i++) {
      if (side2.side === 0) {
        setIsSide(false);
      }
      setIsSide(true);
    }
  }
  sideFunction();

  return (
    <>
      {limitOrderTxs.map((orders, index) => (
        <div key={index} className="alert alert-dismissible alert-primary text-secondary">
          <div>
            <strong>Trader</strong>{" "}{orders.address}
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
            <strong>Price:</strong>{" "}{isSide ?
              (<p className='text-danger'>{orders.price}</p>)
              :
              (<p className='text-success'>{orders.price}</p>)}
          </div>
        </div>
      ))}

    </>

  )
}

export default limitOrderTxList;