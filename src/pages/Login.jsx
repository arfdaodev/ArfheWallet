import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../utils/security";
import { getWalletData } from "../utils/secureStorage";
import "./Login.css";

function Login() {
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa, direkt ana sayfaya yönlendir
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    // 🔥 Şifre boşsa hata ver
    if (!inputPassword) {
      alert("Lütfen bir şifre girin!");
      return;
    }
    console.log("🟢 getWalletData fonksiyon tipi:", typeof getWalletData); // 🔥 Burada test ediyoruz
    try {
      // ✅ IndexedDB’den Private Key ve Mnemonic’i al
      const walletData = await getWalletData(inputPassword);

      if (!walletData) {
        alert("Hata: Cüzdan verileri bulunamadı!");
        return;
      }

      // 🔥 Başarılı giriş: Kullanıcıyı yönlendir
      localStorage.setItem("isLoggedIn", "true");
      alert("✅ Cüzdanınız açıldı!");
      navigate("/home");

    } catch (error) {
      console.error("Giriş hatası:", error);
      alert("Hata: Şifre yanlış veya cüzdan verileri çözülemedi!");
    }
  };

  return (
    <div className="container">
      <img src="/Arfhe-logo.png" alt="Logo" className="app-logo" />
      <h2>Şifre Giriniz</h2>
      <input
        className="login-import-btn"
        type="password"
        placeholder="Şifrenizi Giriniz"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="login-btn">
        Giriş Yap
      </button>
      <button
        onClick={() => navigate(-1)}
        className="back-button-login">
        Geri
      </button>
    </div>
  );
}

export default Login;

