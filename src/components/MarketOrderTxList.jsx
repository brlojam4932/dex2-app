import React from 'react';

function MarketOrderTxList({ marketOrderTxs }) {

  if (marketOrderTxs.length === 0) return null;

  //const [isSide, setIsSide] = (1);

  const side2 = marketOrderTxs[0].side;
  
  /*
  const sideFunction = () => {
    if (side2.side !== 0) {
      console.log("side2:", side2);
    }
    setIsSide(1);
  }
  sideFunction();
*/

  return (
    <>
      {marketOrderTxs.map((orders, index) => (
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
            <strong>Price:</strong>{side2 === 1 ?
              (<p className='text-danger'>{orders.amount}</p>)
              :
              (<p className='text-success'>{orders.amount}</p>)}
          </div>

        </div>
      ))}
    </>
  )
}

export default MarketOrderTxList