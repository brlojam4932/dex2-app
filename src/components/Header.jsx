import React from 'react';
import useWeb3 from '../hooks/useWeb3';
import styled from 'styled-components';
import { useWeb3React } from "@web3-react/core";

export const ButtonWrapper = styled.div`
  desplay: flex;
  align-items: center;
  margin-top: 30px
  justify-content: space-between;
`

export const NavButton2 = styled.div`
font-family: 'Open Sans', sans-serif;
display: flex;
align-items: center;
justify-content: center;
line-style: none;
background: rgb(13,94,209);
width: 200px;
border-radius: 18px;
height: 50px;
text-align: center;
line-height: 50px;
color:  White;
font-size: 16px;
text-decoration: none;

&:hover {
  cursor: pointer;
  background: rgb(0,80,195);
}
`

export const StyledHeader = styled.h1`
  text-align: left;
  max-width: 730px;
`

export const Wrapper = styled.section`
padding: 4em;
`;


const HomeConnectButton = ({ click, disconnect }) => {

  const { active, account } = useWeb3React(); // it controls the display-state of the button

  // if active; it displays account of user
  // if not connected to Web3, we display a connect wallet button
  // if we are connected and we display account, then we can disconnect
  return (
    <>
    { !active
    ? <NavButton2 onClick={click}>
      Connect
      </NavButton2>
    : <NavButton2 onClick={disconnect}>
         {account?.substring(0, 7)
               + "..." + 
              account?.substring(account?.length - 5)}
       </NavButton2>
    }
    </>
  )
}


function Header() {
  
  const { connectOn, disconnect } = useWeb3(); // imported hooks from useWeb3 (disconnect function and connectOn function)
  return (
    <div className='container-1'>
      <div className='box-1'>
        <main className="mt-4 p-4">
          <ButtonWrapper>
          <StyledHeader className="text-xl font-semibold text-info text-left">
            Interact with ERC20 Smart Contract Wallet and DEX
          </StyledHeader>
          <HomeConnectButton click={connectOn} disconnect={disconnect}></HomeConnectButton>
          </ButtonWrapper>
          <p><small className="text-muted">Read and write using my RETK ERC20 Token smart contract on the Ropsten testnet blockchain. Use approve, transfer, transfer from and receive event messages from the blockchain.</small> </p>
          <br />
          <a className="nav-link text-info" href='https://ropsten.etherscan.io/token/0xe4b6351dc44f54e5cbbbe9008f06fa253001bcfb'>Link to my ERC20, RETK token contract </a>
        </main>
      </div>
    </div>
  );
};

export default Header;