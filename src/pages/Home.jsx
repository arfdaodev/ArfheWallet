import React, { useState, useEffect } from "react";
import "./Home.css";
import Homereceivebutton from "../components/button/Homereceivingbutton";
import Bottommenu from "../components/menu/Bottommenu";
import { Homesendbutton, HomeDiscoverybutton, HomeHistorybutton, HomeRevokebutton } from "../components/button/Homesendbutton";
import Sidebar from "../components/menu/Sidebar.jsx";
import { ethers } from "ethers";
import { getWalletData } from "../utils/secureStorage";
import { NETWORKS, createProvider } from "../utils/network";
import { getAssets } from "../utils/getAssets"; // ← yeni fonksiyon burada

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("Yükleniyor...");
  const [error, setError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [provider, setProvider] = useState(null);
  const [tokens, setTokens] = useState([]);

  // Varlıkları çek
  useEffect(() => {
    if (!walletAddress) return;
    getAssets(walletAddress, selectedNetwork)
      .then(setTokens)
      .catch(err => {
        console.error("Token verileri alınırken hata:", err);
        setTokens([]);
      });
  }, [walletAddress, selectedNetwork]);

  useEffect(() => {
    try {
      const newProvider = createProvider(selectedNetwork);
      setProvider(newProvider);
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
        if (!savedWallet?.privateKey) {
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
        <p className="wallet-address2">{walletAddress || "Cüzdan adresi bulunamadı!"}</p>
      </div>
      
      <Sidebar />
      <div className="network"> 
        <label htmlFor="network">Network: </label>
      <select id="network" value={selectedNetwork} onChange={handleNetworkChange}>
        {Object.keys(NETWORKS).map((network) => (
          <option key={network} value={network}>{network}’ye Bağlan</option>
        ))}
      </select>
      </div>
    
      <div className="scroll-wrapper">
    
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
   
      <div className="assets">
        <div className="assets-container">
          <h2 className="assets-title">Assets</h2>
          {tokens.length === 0 ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="asset-items">
              {tokens.map((token, index) => (
                <div key={index} className="asset-item">
                  <h3 className="asset-name">{token.name}</h3>
                  <p className="asset-balance">
                    {token.balance} {token.symbol}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
      <Bottommenu />
    </div>
  );
};

export default Home;
