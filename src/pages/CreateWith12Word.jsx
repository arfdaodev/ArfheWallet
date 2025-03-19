import React, { useState } from "react";
import "./CreateWith12Word.css";
import BackButton from "../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Button } from "antd";



function CreateWith12Word  ({setWallet, setSeedPhrase})  {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet12(){
    const wallet = ethers.Wallet.createRandom();
    if (!wallet.mnemonic) {
      console.error("Mnemonic null döndü");
      return;
    }
    const mnemonic = wallet.mnemonic.phrase;
    console.log("adres:", wallet.address)
    setNewSeedPhrase(mnemonic);
  }
    // newSeedPhrase güncellendiğinde cüzdanı oluştur


  function setWalletAndMnemonic(){
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
    navigate("/importwallet");
  }

  return (
    <div className="container">
      <div>
        <h2 className="header12"> 12 Kelime</h2>
        
        
      </div>
      <div className="mnemonic">
        <p>{newSeedPhrase}</p>
     
      </div>
      <Button
        className="mnemonicolusturcu"
        type="primary"
        onClick={() => generateWallet12()}>Kelimeleri Oluştur</Button>

            <Button
        className="importwalletmnemonic"
        type="default"
        onClick={() => setWalletAndMnemonic()}>Cüzdan Oluştur</Button>
      <BackButton />
    </div>
  );
};

export default CreateWith12Word;
