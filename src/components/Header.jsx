import React from 'react';


function Header() {
  return (
    <div className='container-1'>
      <div className='box-1'>
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-info text-left">
            Interact with ERC20 Smart Contracts and DEX UI
          </h1>
          <p><small className="text-muted">Read from a smart contract, approve, transfer, transfer from and recieve transaction messages from the blockchain.</small> </p>
          <br />
        </main>
      </div>
    </div>
  );
};

export default Header;