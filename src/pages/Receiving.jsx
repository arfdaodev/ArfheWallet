import { useState } from 'react'
import './Receiving.css'
import React from 'react'
import Bottommenu from "../components/menu/Bottommenu";
import {useEffect } from "react";
import QRCodeComponent from "../components/button/QRCodeComponent";
import { ethers } from "ethers";


const Receiving = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // LocalStorage'dan cüzdan adresini al
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);
  return (
    <>
    <div className="container">
      {/* Üst Bilgi (Network ve Asset) */}
      <div className="info-section">
        <div className="info-badge">Network : <span className="highlight">fhEVM</span></div>
        <div className="info-badge">Asset : Bitcoin</div>
      </div>

      {/* QR Kod Alanı */}
      <div className="qr-container">
      <QRCodeComponent address={walletAddress} />
      </div>

      {/* Cüzdan Adresi */}
      <div className="wallet-address">
      {walletAddress ? walletAddress : "Cüzdan adresi bulunamadı!"}
      </div>

     
      <Bottommenu/>
    
    </div>
    
    </>
  );
};

export default Receiving;
