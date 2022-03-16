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
                <p><small className="text-muted">Add ERC20 tokens into DEX, to trade. Deposit the amount tokens, deposit ETH to make transactions and withdraw tokens.</small> </p>
                <p><small className='text-secondary'>You must be login to Metamask or Coinbase Link Wallet.</small></p>
              </main>
            </div>
          </div>

        </div>
      </header>
    </>
  )
}

export default DexHeader;