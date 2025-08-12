import CryptoJS from "crypto-js";

const DB_NAME = "walletDB";
const STORE_NAME = "walletStore";

// 📌 IndexedDB aç veya oluştur
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("IndexedDB açılırken hata oluştu:", event.target.error);
    };
  });
};

// 📌 **Mnemonic & Private Key'i AES ile şifreleyerek IndexedDB'ye kaydet**
export const saveWalletData = async (privateKey, mnemonic, password) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // 🔥 Kullanıcının şifresini PBKDF2 ile hashle
    const hashedPassword = CryptoJS.PBKDF2(password, "salt", { keySize: 256 / 32 }).toString();

    // 🔥 AES ile şifreleme yap
    const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, hashedPassword).toString();
    const encryptedMnemonic = CryptoJS.AES.encrypt(mnemonic, hashedPassword).toString();

    // 🔥 IndexedDB'ye şifreli veriyi kaydet
    store.put({ id: "privateKey", data: encryptedPrivateKey });
    store.put({ id: "mnemonic", data: encryptedMnemonic });

    transaction.oncomplete = () => resolve("✅ Cüzdan başarıyla kaydedildi!");
    transaction.onerror = (error) => reject("❌ Cüzdan kaydedilirken hata oluştu: " + error);
  });
};

// 📌 **Şifreyi Kullanarak Private Key & Mnemonic'i Çöz**
export const getWalletData = async (password) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const privateKeyRequest = store.get("privateKey");
    const mnemonicRequest = store.get("mnemonic");

    privateKeyRequest.onsuccess = () => {
        mnemonicRequest.onsuccess = function(event) {
            const storedMnemonic = event.target.result;
            if (!storedMnemonic) {
                // IndexedDB'de mnemonic yok, fonksiyondan çık.
                return;
            }

        // Kullanıcının şifresini PBKDF2 ile hashle
        const hashedPassword = CryptoJS.PBKDF2(password, "salt", { keySize: 256 / 32 }).toString();

        try {
          // **AES ile Private Key'i çöz**
          const decryptedPrivateKey = CryptoJS.AES.decrypt(privateKeyRequest.result.data, hashedPassword);
          const privateKeyText = decryptedPrivateKey.toString(CryptoJS.enc.Utf8);

          // **AES ile Mnemonic'i çöz**
          const decryptedMnemonic = CryptoJS.AES.decrypt(mnemonicRequest.result.data, hashedPassword);
          const mnemonicText = decryptedMnemonic.toString(CryptoJS.enc.Utf8);

          // ✅ Eğer çözme işlemi başarısızsa hata döndür
          if (!privateKeyText || !mnemonicText) {
            reject(new Error("⚠️ Şifre yanlış veya veriler çözülemedi!"));
            return;
          }

          resolve({ privateKey: privateKeyText, mnemonic: mnemonicText });

        } catch (err) {
            console.error("Mnemonic çözme işleminde hata:", err);
        }
      };
    };

    privateKeyRequest.onerror = () => reject(new Error("⚠️ Hata: Private Key okunamadı!"));
    mnemonicRequest.onerror = () => reject(new Error("⚠️ Hata: Mnemonic okunamadı!"));
  });
};
