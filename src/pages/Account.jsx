import { useState } from "react";
import Bottommenu from "../components/menu/Bottommenu";
import "./Account.css";
import { Link } from "react-router-dom";
import { getWalletData } from "../utils/secureStorage";
import { toast } from "react-toastify";

const Account = () => {
  const [accounts, setAccounts] = useState(["Hesap 1"]); // Başlangıçta 1 hesap
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState("");

  const addAccount = () => {
    if (accounts.length < 6) {
      setAccounts([...accounts, `Hesap ${accounts.length + 1}`]);
    }
  };

  const deleteAccount = () => {
    if (accounts.length > 1) {
      setAccounts(accounts.slice(0, -1));
    }
  };

  const handleShowPrivateKey = async () => {
    setError(""); // Hata mesajını temizle

    if (!password) {
      setError("Lütfen şifrenizi girin.");
      return;
    }

    try {
      const data = await getWalletData(password);
      if (!data) {
        setError("Hata: Cüzdan verileri bulunamadı!");
        return;
      }
      setWalletData(data);
    } catch (error) {
      console.error("Şifre yanlış veya veriler çözülemedi!");
      setError("Şifre yanlış veya veriler çözülemedi!");
    }
  };

  return (
    <div className="container">
      <h2>Ağ</h2>
      <div className="network-select">
        <input type="text" value="Bitcoin" readOnly />
      </div>

      <div className="accounts-container">
        {accounts.map((account, index) => (
          <div key={index} className="account-item">
            <span>{account}</span>
            <div className="icons">
              <button className="icon-button">🔳</button> {/* QR kod ikonu */}
              <button className="icon-button" onClick={() => setShowPasswordModal(true)}>
                👁
              </button> {/* Göster/Gizle */}
              <button
                className="icon-button"
                onClick={deleteAccount}
                disabled={accounts.length <= 1}
              >
                🗑
              </button> {/* Çöp kutusu */}
            </div>
          </div>
        ))}
      </div>

      <div className="actions">
        <button
          className="primary-button"
          onClick={addAccount}
          disabled={accounts.length >= 6}
        >
          Cüzdan Oluştur
        </button>
        <div>
          <Link to="importwallet">
            <button className="import-button-account">Cüzdan İçe Aktar</button>
          </Link>
        </div>
      </div>

      {/* 🔥 Şifre Girme Modalı */}
      {showPasswordModal && (
        <div className="password-modal">
          <div className="password-box">
            <h3>Şifrenizi Girin</h3>
            <input
              type="password"
              placeholder="Şifrenizi Giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleShowPrivateKey}>Onayla</button>
            <button onClick={() => setShowPasswordModal(false)}>İptal</button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}

      {/* 🔥 Eğer şifre doğruysa, Private Key ve Mnemonic göster */}
      {walletData && (
        <div className="wallet-info">
          <h3>Private Key:</h3>
          <p>{walletData.privateKey}</p>
          <h3>Mnemonic:</h3>
          <p>{walletData.mnemonic}</p>
        </div>
      )}

      <div className="bottom-nav">
        <Bottommenu />
      </div>
    </div>
  );
};

export default Account;
