// src/utils/getAssets.js
import { Alchemy, Network } from "alchemy-sdk";
import { ethers} from "ethers";

// Sadece bu iki anahtar Alchemy üzerinden token verisi çekecek
const ALCHEMY_NETWORKS = {
  ethereum: Network.ETH_MAINNET,
  sepolia:  Network.ETH_SEPOLIA,
};

// Diğer iki ağ (Alchemy desteklemez) için RPC URL’leri
const RPC_URLS = {
  holesky: `https://eth-holesky.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
  fhenix:  `https://api.nitrogen.fhenix.zone`,
};


export async function getAssets(address, network) {
  try {
    // 1) Holesky/Fhenix: sadece ETH
    if (network === "holesky" || network === "fhenix") {
      const provider   = new ethers.JsonRpcProvider(RPC_URLS[network]);
      const rawBalance = await provider.getBalance(address);
      // rawBalance ya BigNumber ya da { hex, _hex, ... } gelebilir:
      const hex        = rawBalance.hex ?? rawBalance._hex ?? rawBalance;
      // BigInt'e çevir
      const bn         = typeof hex === "bigint" ? hex : BigInt(hex);
      return [{
        name:    "Ethereum",
        symbol:  "ETH",
        balance: ethers.formatEther(bn), // bigint kabul eder
      }];
    }

    // 2) Ethereum/Sepolia: ETH + ERC-20 tokenlar
    const alchemy = new Alchemy({
      apiKey:  import.meta.env.VITE_ALCHEMY_API_KEY,
      network: ALCHEMY_NETWORKS[network],
    });

    // ● ETH bakiyesi
    const rawEthWei  = await alchemy.core.getBalance(address);
    const ethHex     = rawEthWei.hex ?? rawEthWei._hex ?? rawEthWei;
    const ethBn      = typeof ethHex === "bigint" ? ethHex : BigInt(ethHex);
    const ethBalance = ethers.formatEther(ethBn);

    // ● ERC-20 bakiyeleri (>0 filtreli)
    const { tokenBalances } = await alchemy.core.getTokenBalances(address);
    const nonZero = tokenBalances.filter(t => t.tokenBalance !== "0");

    const tokens = await Promise.all(nonZero.map(async t => {
      const metadata = await alchemy.core.getTokenMetadata(t.contractAddress);
      const raw       = t.tokenBalance;
      const hexToken  = raw.hex ?? raw._hex ?? raw;
      const tokenBn   = typeof hexToken === "bigint" ? hexToken : BigInt(hexToken);
      const formatted = ethers.formatUnits(tokenBn, metadata.decimals || 18);

      return {
        name:    metadata.name,
        symbol:  metadata.symbol,
        balance: formatted,
      };
    }));

    return [
      { name: "Ethereum", symbol: "ETH", balance: ethBalance },
      ...tokens,
    ];
  } catch (err) {
    console.error("getAssets hata:", err);
    return [];
  }
}