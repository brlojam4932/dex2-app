import React from 'react';

function DexHeader() {
  return (
    <>
      {/* DEX Wallet Header */}
      <header className='container-2'>
        <div className='box-1'>
          <div>
            <div className='m-4'>
              <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-info text-left">
                  DEX UI
                </h1>
                <p><small className="text-muted">To trade, add ERC20 tokens into DEX on the Ropsten testnet blockchain. Deposit the amount of tokens, deposit ETH to make transactions and withdraw tokens.</small></p>
                <p><small className="text-muted">First, the symbol or tiker of a token like DAI must be added from a Metamaks account. Then, once can deposit an amount. The DEX needs to be approved by the DEX wallet at the top of the Dapp. ETH must also be deposited into the DEX.</small></p>
                <p><small className="text-muted">In the DEX trading section, one can make sell and buy orders. Trades and history should appear or refresh the page.</small></p>
                <p><small className='text-secondary'>You must be login to Metamask.</small></p>
              </main>
            </div>
          </div>

        </div>
      </header>
    </>
  )
}

export default DexHeader;