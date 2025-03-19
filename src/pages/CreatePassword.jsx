import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveWalletData } from "../utils/secureStorage";
import "./CreatePassword.css";

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mnemonic = location.state?.mnemonic || sessionStorage.getItem("mnemonic") || "";
  const privateKey = location.state?.privateKey || sessionStorage.getItem("privateKey") || "";  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSavePassword = async () =>{
    if (!mnemonic) {
      console.warn("⚠️ Uyarı: Mnemonikler eksik, sadece Private Key ile devam ediliyor.");
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
      alert("Şifre 16 karakterden uzun olmamalıdır!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Şifre en az bir büyük harf içermeli!")
      return;
    }
    if (!/[a-z]/.test(password)) {
      alert("Şifre en az bir küçük harf içermeli!")
      return;
    }
    if (!/\d/.test(password)) {
      alert("Şifre en az bir rakam içermeli!")
      return;
    }
    if (["password", "123456", "admin", "qwerty", "letmein", "arfdao", "arfhe"].some(word => password.toLowerCase().includes(word))) {
      alert("Bu şifre çok zayıf! Daha güçlü bir şifre seç.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      // ✅ **Private Key ve Mnemonic’i IndexedDB'ye şifreleyerek kaydet**
      await saveWalletData(privateKey, mnemonic || "", password);

      sessionStorage.removeItem("mnemonic");
      sessionStorage.removeItem("privateKey");

      alert("✅ Şifre ve cüzdan başarıyla kaydedildi!");
      navigate("/login");

    } catch (error) {
      console.error("Şifre kaydetme hatası:", error);
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
        <button onClick={handleSavePassword} className="save-password-btn">Şifreyi Kaydet</button>
        <button onClick={() => navigate(-1)} className="back-button-password">Geri</button>
      </div>
    </div>
  );
};

export default CreatePassword;
