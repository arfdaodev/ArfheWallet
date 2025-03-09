import React, { useState } from "react";
import "./CreateWith24Word.css"; // Aynı CSS dosyasını kullanabilirsin
import BackButton from "../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Button } from "antd";
import { Mnemonic } from "ethers";

function CreateWith24Word({ setWallet, setSeedPhrase }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet24() {
    const entropy = ethers.randomBytes(32); // 32 byte = 24 kelimelik entropy
    const mnemonic = Mnemonic.fromEntropy(entropy).phrase;

    console.log("24 Kelimelik Mnemonic:", mnemonic);
    setNewSeedPhrase(mnemonic);
  }

  function setWalletAndMnemonic() {
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
    navigate("/importwallet");
  }

  return (
    <div className="container">
      <div>
        <h2 className="header12"> 24 Kelime</h2>
      </div>
      <div className="mnemonic">
        <p>{newSeedPhrase}</p>
      </div>
      <Button
        className="mnemonicolusturcu"
        type="primary"
        onClick={generateWallet24}
      >
        Kelimeleri Oluştur
      </Button>

      <Button
        className="importwalletmnemonic"
        type="default"
        onClick={setWalletAndMnemonic}
      >
        Cüzdan Oluştur
      </Button>
      <BackButton />
    </div>
  );
}

export default CreateWith24Word;
