import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { verifyPassword, decryptData } from "../utils/security";

function Login() {
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa, direkt ana sayfaya yönlendir
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    const savedPassword = localStorage.getItem("walletPasswordHash"); // Kayıtlı şifreyi al

    if (!savedPassword) {
      alert("Kayıtlı şifre bulunamadı!");
      return;
    }

     // Şifre doğruysa, mnemonikleri çözüp gösterelim
     const encryptedMnemonic = localStorage.getItem("encryptedMnemonic");
     if (!encryptedMnemonic) {
       alert("Hata: Şifrelenmiş mnemonikler bulunamadı!");
       return;
     }
 
     const decryptedMnemonic = decryptData(encryptedMnemonic, password);
     alert(`Cüzdanınız açıldı! `);
     navigate("/home");
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
