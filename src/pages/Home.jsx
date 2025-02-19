import React from "react";
import "./Home.css";
import Homereceivebutton from '../components/Homereceivingbutton';
import Bottommenu from "../components/Bottommenu";
import { Homesendbutton, HomeDiscoverybutton, HomeHistorybutton, HomeRevokebutton } from "../components/Homesendbutton";

const Home = () => {
 
  return (
    <div className="dashboard-container">
      
      {/* 📌 Üst Kısım - Hesap ve Network */}
      <div className="top-section">
        <h3 className="account-title">Hesap</h3>
        <p className="account-name">biar.arf</p>
        <div className="network-badge">
          Network : <span className="network-name">fhEVM</span>
        </div>
        <div className="menu-icon">⋮</div>
      </div>

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
    <div className="asset-list">
        <div className="asset-item">
            <div className="asset-icon">
                <img src="/coin.svg" alt="Coin" />
            </div>
            1 ARF
        </div>
        <div className="asset-item">
            <div className="asset-icon">
                <img src="/coin.svg" alt="Coin" />
            </div>
            1 ETH
        </div>
        <div className="asset-item">
            <div className="asset-icon">
                <img src="/coin.svg" alt="Coin" />
            </div>
            1 BTC
        </div>
        <div className="asset-item">
            <div className="asset-icon">
                <img src="/coin.svg" alt="Coin" />
            </div>
            1 SOL
        </div>
    </div>
</div>


      {/* 📌 Alt Menü */}
      <Bottommenu />

    </div>
  );
};

export default Home;
