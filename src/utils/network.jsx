import { ethers } from "ethers";

const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
console.log("API Key:", apiKey);

// 📌 **Desteklenen Ağlar**
export const NETWORKS = {
  ethereum: {
    chainId: 1,
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  },
  sepolia: {
    chainId: 11155111,
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
  },
  holesky: {
    chainId: 17000,
    rpcUrl: `https://eth-holesky.g.alchemy.com/v2/${apiKey}`,
  },
  fhenix: {
    chainId: 8008148,
    rpcUrl: "https://api.nitrogen.fhenix.zone",
  },
};

export const createProvider = (networkName) => {
  if (!NETWORKS[networkName]) {
    throw new Error(`❌ Desteklenmeyen ağ: ${networkName}`);
  }

  const { rpcUrl } = NETWORKS[networkName];
  return new ethers.JsonRpcProvider(rpcUrl);
};
