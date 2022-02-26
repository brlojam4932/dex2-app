import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootswatch/dist/slate/bootstrap.min.css';
// import { ethers, BigNumber } from "ethers";
// import { useEffect, useState } from react;

// start with Filip's...
// https://youtu.be/XOvtnDx1m5c

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">My DEX</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
            </ul>
            <button id="login_button" className="btn btn-secondary my-2 my-sm-0" type="submit">Sign in with Metamask</button>
          </div>
        </div>
      </nav>
      <div className='container'>
        <div className='row' style={{ backgroundColor: "red" }}>
          <div className='col col-md-6 offset-md-3' id='window'>
            <h4>Swap</h4>
            <div id='form'>
              <div className='swapbox'>
                <div className='swapbox_select'>
                  TOKEN SELECT
                </div>
                <div className='swapbox_select'>
                  <input className='number form-control' placeholder='amount' id='from_amount' />
                </div>
              </div>
              <div className='swapbox'>
                <div className='swapbox_select'>
                  TOKEN SELECT
                </div>
                <div className='swapbox_select'>
                  <input className='number form-control' placeholder='amount' id='from_amount' />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
