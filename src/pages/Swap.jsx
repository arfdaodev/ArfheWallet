import './Swap.css'
import Bottommenu from "../components/menu/Bottommenu";
import React from "react";
import Slipaj from '../components/menu/slipaj';


const Swap = () => {
  return (
    <div className="container">


<div className="swap-container">
  {/* Swap Box 1 - USDC */}
  <label className="swap-label">Varlık Seçiniz</label>
  <input type="number" placeholder="0" className="swap-input" />

  {/* Swap Box 2 - BTC */}
  <label className="swap-label2">Varlık Seçiniz</label>
  <input type="number" placeholder="0" className="swap-input2" />
</div>

      {/* Slippage */}
      <div className="slippage">
        <div className="slippage-icon" />
        <span>Slipaj</span>
      </div>

      {/* Swap Simulation */}
      <div className="swap-simulation">Takas Simülasyonu</div>

      <div className='header'>
      <h1 className="app-title"></h1>
    <img src="/swap.png" alt='Logo' className='swap-logo' />
    </div>
    <label for="assest2"></label>
<select id="assest2">
    <option value="bitcoin">BTC</option>
    <option value="etherium">ETH</option>
    <option value="solana">SOL</option>
    <option value="arf">ARF</option>
</select>
<label for="assest3"></label>
<select id="assest3">
    <option value="bitcoin">BTC</option>
    <option value="etherium">ETH</option>
    <option value="solana">SOL</option>
    <option value="arf">ARF</option>
</select>

    

      <Bottommenu/>
      <Slipaj/>
    </div>
  );
};

export default Swap;
