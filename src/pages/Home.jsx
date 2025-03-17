import React, { useState, useEffect } from "react";
import "./Home.css";
import Homereceivebutton from '../components/button/Homereceivingbutton';
import Bottommenu from "../components/menu/Bottommenu";
import { Homesendbutton, HomeDiscoverybutton, HomeHistorybutton, HomeRevokebutton } from "../components/button/Homesendbutton";
import Sidebar from "../components/menu/Sidebar.jsx";
import { ethers } from "ethers";
import { getWalletData } from "../utils/secureStorage";
import { JsonRpcProvider } from "ethers";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("Yükleniyor...");
  const [error, setError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("holesky");
  const [provider, setProvider] = useState(null);

  const providers = {
    holesky: "https://eth-holesky.g.alchemy.com/v2/-UwtQKs82xJefcySHhrajydYbUX0leZ8",
    sepolia: "https://eth-sepolia.g.alchemy.com/v2/-UwtQKs82xJefcySHhrajydYbUX0leZ8",
  };

  // **🔥 Ağı değiştirdiğinde yeni provider'ı oluştur**
  useEffect(() => {
    setProvider(new JsonRpcProvider(providers[selectedNetwork]));
    console.log(`🔄 Ağ değiştirildi: ${selectedNetwork}`);
  }, [selectedNetwork]);

  const handleNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const savedWallet = await getWalletData(localStorage.getItem("walletPassword"));
        
        if (!savedWallet || !savedWallet.privateKey) {
          setError("Cüzdan adresi bulunamadı!");
          return;
        }

        const wallet = new ethers.Wallet(savedWallet.privateKey);
        setWalletAddress(wallet.address);
      } catch (err) {
        console.error("Cüzdan alınırken hata:", err);
        setError("Cüzdan verileri çözülemedi!");
      }
    };

    fetchWalletData();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress || !provider) return;

      try {
        const balanceWei = await provider.getBalance(walletAddress);
        setBalance(ethers.formatEther(balanceWei) + " ETH");
      } catch (error) {
        console.error("Bakiye alınırken hata oluştu:", error);
        setBalance("Hata!");
      }
    };

    fetchBalance();

    // 🔥 **Her 10 saniyede bir bakiyeyi güncelle**
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [walletAddress, provider]); // **✅ provider değiştiğinde de fetchBalance çağrılacak!**

  useEffect(() => {
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
      </div>

      <label htmlFor="network">Network: </label>
      <select id="network" value={selectedNetwork} onChange={handleNetworkChange}>
        <option value="sepolia">Sepolia'ya Bağlan</option>
        <option value="holesky">Holesky'ye Bağlan</option>
      </select>

      <Sidebar />
      {/* 📌 Profil ve Bakiye */}
      <div className="profile-container">
        <img src="/image2.png" alt="Profile" className="profile-image" />
      </div>
     <h1 className="balance">{balance}</h1>
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
