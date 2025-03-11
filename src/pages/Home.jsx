import React from "react";
import "./Home.css";
import Homereceivebutton from '../components/button/Homereceivingbutton';
import Bottommenu from "../components/menu/Bottommenu";
import { Homesendbutton, HomeDiscoverybutton, HomeHistorybutton, HomeRevokebutton } from "../components/button/Homesendbutton";
import Sidebar from "../components/menu/Sidebar.jsx";
import { useState, useEffect } from "react";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
    useEffect(() => {
        // LocalStorage'dan cüzdan adresini al
        const savedAddress = localStorage.getItem("walletAddress");
        if (savedAddress) {
          setWalletAddress(savedAddress);
        }
    }, []);

  return (
    <div className="container">
     
      {/* 📌 Üst Kısım - Hesap ve Network */}
      <div className="top-section">
        <h3 className="account-title2">Hesap</h3>
        <p className="accountname">biar.arf</p>
        <p className="wallet-address2">{walletAddress ? walletAddress : "Cüzdan adresi bulunamadı!"}</p>
        <div className="network-badge">
          Network : <span className="network-name">fhEVM</span>
        </div>
      </div>
          <Sidebar />
      {/* 📌 Profil ve Bakiye */}
      <div className="profile-container">
        <img src="/image2.png" alt="Profile" className="profile-image" />
        <h1 className="balance">1.501,12₺</h1>
      </div>

      {/* 📌 Grafik Alanı */}
      <div className="chart-container">
        <div className="chart">
          {/* Grafik Kütüphanesi ile Eklenecek */}
        </div>
      </div>

      {/* 📌 İşlem Butonları */}
      <div className="action-buttons">
        <Homereceivebutton />
        <HomeDiscoverybutton />
        <HomeHistorybutton />
        <HomeRevokebutton />
        <Homesendbutton />
      </div>

      {/* 📌 Varlıklar */}
      <div className="assets-container">
        <h2 className="assets-title">Assets</h2>
        <div className="asset-item">1 ARF</div>
        <div className="asset-item">1 ETH</div>
        <div className="asset-item">1 BTC</div>
        <div className="asset-item">1 SOL</div>
      </div>

    
      <Bottommenu />
    </div>
  );
};

export default Home;
