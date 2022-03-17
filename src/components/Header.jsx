import React from 'react';


function Header() {
  return (
    <div className='container-1'>
      <div className='box-1'>
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-info text-left">
            Interact with ERC20 Smart Contracts and DEX UI
          </h1>
          <p><small className="text-muted">Read and write from any ERC20 Token smart contract on the Robsten testnet blockchain. Use approve, transfer, transfer from and receive event messages from the blockchain.</small> </p>
          <br />
          <a className="nav-link text-info" href='https://ropsten.etherscan.io/token/0xe4b6351dc44f54e5cbbbe9008f06fa253001bcfb'>Link to my ERC20 RETK token contract </a>
        </main>
      </div>
    </div>
  );
};

export default Header;