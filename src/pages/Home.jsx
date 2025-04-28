import React, { useState, useEffect } from "react";
import "./Home.css";
import Homereceivebutton from '../components/button/Homereceivingbutton';
import Bottommenu from "../components/menu/Bottommenu";
import { Homesendbutton, HomeDiscoverybutton, HomeHistorybutton, HomeRevokebutton } from "../components/button/Homesendbutton";
import Sidebar from "../components/menu/Sidebar.jsx";
import { ethers } from "ethers";
import { getWalletData } from "../utils/secureStorage";
import { NETWORKS, createProvider } from "../utils/network";
import Web3 from 'web3'; // Web3.js'i import ettik
import { getTokenBalances } from "../utils/alchemy";

// Alchemy API URL'nizi buraya yerleştirin
const alchemyUrl = 'https://eth-sepolia.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY'; // Sepolia test ağı
const web3 = new Web3(new Web3.providers.HttpProvider(alchemyUrl)); // Web3 provider



const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("Yükleniyor...");
  const [error, setError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("holesky");
  const [provider, setProvider] = useState(null);
  const [assets, setAssets] = useState([]); // Token ve bakiyelerini saklamak için state
  const [tokens, setTokens] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      if (!walletAddress) return;
  
      try {
        console.log(`🛠 ${selectedNetwork} ağı için token bilgileri alınıyor...`);
        const balances = await getTokenBalances(walletAddress, selectedNetwork); // Ağ bilgisini gönder!
        console.log("📜 Token Bilgileri:", balances);
  
        setTokens(balances);
      } catch (error) {
        console.error("⚠️ Token bakiyeleri alınırken hata oluştu:", error);
        setTokens([]);
      }
    };
  
    fetchBalances();
  }, [walletAddress, selectedNetwork]); // Ağ değiştiğinde yeniden al!
  
  
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
        {assets.length === 0 ? (
          <p>Yükleniyor...</p>
        ) : (
          <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              {token.name}: {token.balance} {token.symbol}
            </li>
          ))}
        </ul>
        )}
      </div>

      <Bottommenu />
    </div>
  );
};

export default Home;
