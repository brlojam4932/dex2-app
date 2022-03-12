import React from 'react';

function ApproveList({ approveTx }) {

  return (
    <>
      {approveTx.map((approves, index) => (
        <div key={index} className="alert alert-dismissible alert-success">
          <div>
            <strong>Spender:</strong>{" "}{approves.spender}
          </div>
          <div>
            <strong>Amount:</strong>{" "}{approves.amount}
          </div>

        </div>
      ))}
    </>
  )



}

export default ApproveList