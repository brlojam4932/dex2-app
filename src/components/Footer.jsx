import React from 'react';

function Footer() {
  return (
    <div className='container-1'>
    <div className='box-1'>
      <main className="mt-4 p-4">
        <h4 className="text-xl font-semibold text-info text-left">
         Smart contracts and DEX project
        </h4>
        <p><small className="text-muted"> I created this project while at the Moralis Academy, Solidity course. Initially, I finished the smart contracts in summer of 2020 but it took me some time to learn React, web3, Truffle, Ganche, Hardhat, Ethers js, etc... March 14, 2022</small></p>
        <p><small className="text-muted">It is now May 6th, 2022. I had to revisit this project as I mentioned above...it needed improvements such as moving logic into smaller components and getting rid of buttons for getting balances but that also introduced some issues such as re-rendeing from useEffect. I think this has allowed me to understand better how Dapps should work for users.</small></p>
        <br />
      </main>
    </div>
  </div>
  );
};

export default Footer;