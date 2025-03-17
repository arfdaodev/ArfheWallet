import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { encryptData , hashPassword } from "../utils/security"; // Şifreleme fonksiyonunu al
import "./CreatePassword.css";
import CryptoJS from "crypto-js";
import { saveWalletData } from "../utils/secureStorage";

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mnemonic = location.state?.mnemonic || sessionStorage.getItem("mnemonic") || "";
  const privateKey = location.state?.privateKey || sessionStorage.getItem("privateKey") || "";  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const forbiddenWords = ["password", "123456", "admin", "qwerty", "letmein", "arfdao", "arfhe","aaaaaaaaa","00000000000"];

  const handleSavePassword = async () =>{
    if (!mnemonic) {
      alert("Mnemonikler alınamadı! Lütfen tekrar deneyin.");
      return;
    }
    if (!privateKey) {
      alert("Hata: Private Key bulunamadı!");
      return;
    }
    if (!password || !confirmPassword) {
      alert("Lütfen bir şifre girin!");
      return;
    }
    if (password.length < 8) {
      alert("Şifre en az 8 karakter olmalıdır!");
      return;
    }
    if (password.length > 16) {
      alert("Şifre en az 16 karakter olmalıdır!");
      return;
    }
    if (!hasUpperCase) {
      alert("Şifre en az bir büyük harf içermeli!")
      return;
    }
    if (!hasLowerCase) {
      alert("Şifre en az bir küçük harf içermeli!")
      return;
    }
    if (!hasNumber) {
      alert("Şifre en az bir rakam içermeli!")
      return;
    }
    if (forbiddenWords.some((word) => password.toLowerCase().includes(word))) {
      return "Bu şifre çok zayıf! Daha güçlü bir şifre seç.";
    }
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      // ✅ Private Key ve Mnemonic’i IndexedDB'ye şifreleyerek kaydet
      const result = await saveWalletData(privateKey, mnemonic, password);
      console.log(result);

      sessionStorage.removeItem("mnemonic");
      sessionStorage.removeItem("privateKey");

      alert("✅ Şifre ve cüzdan başarıyla kaydedildi!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Hata oluştu!");
    }
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
