import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { encryptData , hashPassword } from "../utils/security"; // Şifreleme fonksiyonunu al
import "./CreatePassword.css";

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mnemonic = location.state?.mnemonic || ""; // Önceki sayfadan gelen mnemonikler

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSavePassword = () => {
    if (!mnemonic) {
      alert("Mnemonikler alınamadı! Lütfen tekrar deneyin.");
      return;
    }

    if (!password || !confirmPassword) {
      alert("Lütfen bir şifre girin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

     // **Şifreyi PBKDF2 ile hashleyerek sakla**
     const hashedPassword = hashPassword(password);
     localStorage.setItem("walletPasswordHash", hashedPassword); // Hashlenmiş şifreyi kaydet
 

    // ✅ **AES ile mnemonikleri şifreleyerek sakla**
    const encryptedMnemonic = encryptData(mnemonic, password);

    localStorage.setItem("encryptedMnemonic", encryptedMnemonic); // 🔥 Mnemonikleri sakla

    alert("Şifre ve cüzdan başarıyla kaydedildi!");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header8">
        <h1 className="app-title">Arfhe Wallet</h1>
        <img src="/Arfhe-logo.png" alt="Logo" className="app-logo" />
      </div>

      <div className="content">
        <input
          type="password"
          className="password-input"
          placeholder="Şifrenizi Giriniz"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="passwordreplay-input"
          placeholder="Şifrenizi Tekrar Giriniz"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="content">
        <button onClick={handleSavePassword} className="save-password-btn">
          Şifreyi Kaydet
        </button>
        <button
          onClick={() => navigate(-1)}
          className="back-button-password"
        >
          Geri
        </button>
      </div>
    </div>
  );
};

export default CreatePassword;
