import CryptoJS from "crypto-js";

// Kullanıcı şifresinden AES anahtarı türetme (PBKDF2)
export function deriveKey(password) {
  return CryptoJS.PBKDF2(password, "wallet_salt", {
    keySize: 256 / 32,
    iterations: 100000,
  }).toString();
}

// AES-256 ile veri şifreleme
export function encryptData(data, password) {
  const key = deriveKey(password);
  return CryptoJS.AES.encrypt(data, key).toString();
}

// AES-256 ile veri çözme
export function decryptData(encryptedData, password) {
  const key = deriveKey(password);
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
// **Şifreyi PBKDF2 ile hashleyerek sakla**
export function hashPassword(password) {
    return CryptoJS.PBKDF2(password, "wallet_salt", {
      keySize: 256 / 32,
      iterations: 100000,
    }).toString();
  }
  
  // **Şifre doğrulama: Kullanıcının girdiği şifreyi hashleyip karşılaştır**
  export function verifyPassword(inputPassword, storedHash) {
    const hashedInput = hashPassword(inputPassword);
    return hashedInput === storedHash;
  }