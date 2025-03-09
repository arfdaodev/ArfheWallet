import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setWallet }) {
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa, direkt ana sayfaya yönlendir
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    const savedPassword = localStorage.getItem("walletPassword"); // Kayıtlı şifreyi al

    if (!savedPassword) {
      alert("Kayıtlı şifre bulunamadı!");
      return;
    }

    if (inputPassword === savedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      alert("✅ Giriş başarılı!");

      // 🌟 Kullanıcının cüzdan adresini al ve konsola yazdır
      const savedWalletAddress = localStorage.getItem("walletAddress");

      if (savedWalletAddress) {
        console.log("✅ Kullanıcının cüzdan adresi:", savedWalletAddress);
      } else {
        console.warn("❌ Cüzdan adresi kayıtlı değil!");
      }

      navigate("/home");
    } else {
      alert("❌ Yanlış şifre! Lütfen tekrar deneyin.");
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
        onClick={() => {
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true });
          }
        }}
        className="back-button-login"
      >
        Geri
      </button>
    </div>
  );
}

export default Login;
