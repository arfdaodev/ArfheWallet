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