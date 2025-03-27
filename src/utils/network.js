import { ethers } from "ethers";

// 📌 **Desteklenen Ağlar**
export const NETWORKS = {
  ethereum: {
    chainId: 1, // Ethereum Mainnet
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/-UwtQKs82xJefcySHhrajydYbUX0leZ8",
  },
  sepolia: {
    chainId: 11155111, // Sepolia Testnet
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/-UwtQKs82xJefcySHhrajydYbUX0leZ8",
  },
  holesky: {
    chainId: 17000, // Holesky Testnet
    rpcUrl: "https://eth-holesky.g.alchemy.com/v2/-UwtQKs82xJefcySHhrajydYbUX0leZ8",
  },
  fhenix: {
    chainId: 8008148, // 🔥 **Buraya Fhenix Chain ID'sini gir**
    rpcUrl: "https://api.nitrogen.fhenix.zone", // 🔥 **Buraya Fhenix RPC URL'ini gir**
  },
};

// 📌 **Belirli bir ağa bağlanmak için provider oluştur**
export const createProvider = (networkName) => {
  if (!NETWORKS[networkName]) {
    throw new Error(`❌ Desteklenmeyen ağ: ${networkName}`);
  }

  const { rpcUrl } = NETWORKS[networkName];
  return new ethers.JsonRpcProvider(rpcUrl);
};
