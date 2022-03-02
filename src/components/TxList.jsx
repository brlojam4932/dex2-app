import React from 'react'

function TxList({ txs }) {

  if (txs.length === 0) return null;

  return (
      <>
      {txs.map((item, index) => (
        <div key={index} className="alert alert-dismissible alert-secondary">
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          <div>
            <strong>From:</strong>{" "}{item.from}
          </div>
          <div>
            <strong>To:</strong>{" "}{item.to}
          </div>
          <div>
            <strong>Amount:</strong>{" "}{item.amount}
          </div>          
          {/* if Contract is on Ropsten or Rineby
              <a href={`https://ropsten.etherscan.io/tx/${item.txHash}`}>
                  Check in block explorer
              </a>
               */}
        </div>
      ))}
    </>
  )
}

export default TxList;