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
          <br />
          <p><small className="text-muted">Here is a DEX project I coded at Moralis Academy, following instructor Filip Martinsson. The project was coded in Solidity and most recently, I unit tested it using Hardaht and developed the Dapp using React, which I also learned at Moralis. After a young Moralis dev looked at my project, he made some suggenstions so I updated this Dapp, as it uses now Web3-React to create an account, signers and provider and I also re-factored the code, to create smaller components, which where missing. The Dapp has taking me a long time to develop and it's not perfect by any means.
        </small> </p>
          <p><small className="text-muted">
          There are issues with useEffect re-renders and a few other issues but overall, it works, except now, the widthraw ETH is not adding the ETH back to Metamask wallet. Regardles, I need to finish it and move on. Conversely, one can send tokens, receive, approve and buy and sell tokens using the DEX contract. I would have to send you some of my RealToken, RETK token or one can easily trade any other token like DAI or LINK.</small> </p>
          <p><small className="text-muted">Lastly, some kinks...it's not what I wanted by the connect button has to be clicked to updated the token balances. I set up a refresh button which clears up some of the re-renders but it also softly disconnects the Dapp from Metamask, hence the re-clicking of the connect button. The DEX might have to be refreshed the first time and then it should be fine</small> </p>
          <br />
          <a className="nav-link text-info" href='https://ropsten.etherscan.io/address/0x55576CDf0f328101A9d7029658F14500952AAfD0'>Link to my ERC20, RETK token contract </a>
          <br />
          <a className="nav-link text-info" href='https://ropsten.etherscan.io/address/0x6bCD042f1D4B390DC912ef682B272F429f638f3C'>Link to my DEX contract </a>
        </main>
      </div>
    </div>
  );
};

export default Header;