import React, { useState, useEffect } from "react";
import "./Home.css";
import Homereceivebutton from '../components/button/Homereceivingbutton';
import Bottommenu from "../components/menu/Bottommenu";
import { Homesendbutton, HomeDiscoverybutton, HomeHistorybutton, HomeRevokebutton } from "../components/button/Homesendbutton";
import Sidebar from "../components/menu/Sidebar.jsx";
import { ethers } from "ethers";
import { getWalletData } from "../utils/secureStorage";
import { NETWORKS, createProvider } from "../utils/network";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("Yükleniyor...");
  const [error, setError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("holesky");
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    try {
      const newProvider = createProvider(selectedNetwork);
      setProvider(newProvider);
      console.log(`🔄 Ağ değiştirildi: ${selectedNetwork}`);
    } catch (err) {
      console.error("Ağ değiştirirken hata oluştu:", err);
    }
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
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [walletAddress, provider]);

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  return (
    <div className="container">
      <div className="top-section">
        <h3 className="account-title2">Hesap</h3>
        <p className="accountname">biar.arf</p>
        <p className="wallet-address2">{walletAddress ? walletAddress : "Cüzdan adresi bulunamadı!"}</p>
      </div>

      <label htmlFor="network">Network: </label>
      <select id="network" value={selectedNetwork} onChange={handleNetworkChange}>
        {Object.keys(NETWORKS).map((network) => (
          <option key={network} value={network}>{network}’ye Bağlan</option>
        ))}
      </select>

      <Sidebar />
      <div className="profile-container">
        <img src="/image2.png" alt="Profile" className="profile-image" />
      </div>
      <h1 className="balance">{balance}</h1>
      <div className="chart-container">
        <div className="chart"></div>
      </div>

      <div className="action-buttons">
        <Homereceivebutton />
        <HomeDiscoverybutton />
        <HomeHistorybutton />
        <HomeRevokebutton />
        <Homesendbutton />
      </div>

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
