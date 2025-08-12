<<<<<<< HEAD
import React, { useState } from "react";
import "./ImportWallet.css";

const MnemonicDisplay = ({ words, title }) => {
  const [hover, setHover] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(words.join(" "));
    alert("Kelimeler kopyalandı!");
  };

  return (
    <div className="mnemonic-container">
      <button
        className="copy-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={copyToClipboard}
      >
        {hover ? "Kopyala" : "📋"}
      </button>
      <span className="mnemonic-title">{title}</span>
      <div className="mnemonic-box">
        {words.map((word, index) => (
          <span key={index} className="mnemonic-word">
            {index + 1}. {word}
          </span>
        ))}
      </div>
    </div>
  );
};

const PasswordInput = () => {
  const twelveWords = ["arf", "atuk", "duru", "kaban", "adalan", "irim", "iz", "oray", "dermek", "dilek", "elban", "ela"];
  const twentyFourWords = [
    "aydan", "devin", "kang", "sabak", "crack", "orga", "ming", "san", "balaban", "orgun", "babat", "edil", 
    "motun", "kelgin", "guna", "salaman", "azboy", "otgun", "oybat", "kuzu", "koyu", "kiyal", "ilgi", "otkun"
  ];

  return (
    <div className="app-container">
      <MnemonicDisplay words={twelveWords} title="12 Kelime" />
      <MnemonicDisplay words={twentyFourWords} title="24 Kelime" />
      <button className="wallet-button">Cüzdan Oluştur</button>
      <button className="back-button">Geri</button>
    </div>
  );
};

export default PasswordInput;
=======
import React ,{ useState } from 'react'
import './ImportWallet.css'
import { ethers } from "ethers";
import BackButton from '../components/button/BackButton'
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'antd';
import { toast } from "react-toastify";

function App({setWallet }) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");


  async function importWallet() {
    try {
      if(mnemonic.trim()) {
      const wallet = ethers.Wallet.fromPhrase(mnemonic.trim());
      console.log("✅ Oluşturulan cüzdan adresi:", wallet.address);
      localStorage.setItem("walletAddress", wallet.address); // Cüzdan adresini kalıcı olarak sakla
      sessionStorage.setItem("mnemonic", mnemonic);
      sessionStorage.setItem("privateKey", wallet.privateKey);

      setWallet(wallet.address); // Cüzdanı state'e kaydet
      navigate("/createpassword"); // Başarılıysa ana sayfaya yönlendir
      }
      else if (privateKey.trim()) {
        const wallet = new  ethers.Wallet(privateKey.trim());
        console.log("✅ Oluşturulan cüzdan adresi:", wallet.address);
        localStorage.setItem("walletAddress", wallet.address); // Cüzdan adresini kalıcı olarak sakla
        sessionStorage.setItem("mnemonic", mnemonic);
        sessionStorage.setItem("privateKey", wallet.privateKey);
  
        setWallet(wallet.address); // Cüzdanı state'e kaydet
        navigate("/createpassword"); // Başarılıysa ana sayfaya yönlendir

      }
    } catch (error) {
      console.error("Geçersiz mnemonic:", error);
      toast.error("Geçersiz mnemonic! Lütfen doğru kelimeleri girin.");
    }
  }
  return (
    <>
    <div className="container">
      <div className='header5'>
      <h1 className="app-title">Arfhe Wallet</h1>
    <img src="/Arfhe-logo.png" alt='Logo' className='app-logo' />
      

      </div>

      <div className='content'>
    <input
      type="text"
      className="seed-input"
      placeholder="Gizli Kelimeleri Giriniz"
      value={mnemonic}
      onChange={(e) => setMnemonic(e.target.value)}
        rows={2}
    />

    <input
      type="text"
      className="privatekey-input"
      placeholder="Gizli Anahtarı Giriniz"
      value={privateKey}
      onChange={(e) => setPrivateKey(e.target.value)}
        rows={2}
    />

        
      </div>
      <div className='content'>
       
      <Button className="importbutton3" type="primary" onClick={importWallet}>
        İçe aktar
      </Button>
       <BackButton/>
     </div>
     
    </div>

    </>
  )
}

export default App
>>>>>>> Arfhe-v1.0.0-relax
