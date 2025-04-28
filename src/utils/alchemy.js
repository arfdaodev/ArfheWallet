import { Alchemy, Network } from "alchemy-sdk";

// Ağları belirleyelim
const ALCHEMY_NETWORKS = {
  fhenix: Network.FHENIX,
  sepolia: Network.ETH_SEPOLIA,
  holesky: Network.ETH_HOLESKY,
  mainnet: Network.ETH_MAINNET,
};

// Dinamik olarak Alchemy istemcisi oluştur
const getAlchemyInstance = (network) => {
  return new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY, // .env'den API key al!
    network: ALCHEMY_NETWORKS[network] || Network.ETH_HOLESKY, // Varsayılan Sepolia
  });
};

// Token bakiyelerini getiren fonksiyon
export const getTokenBalances = async (walletAddress, selectedNetwork = "sepolia") => {
  if (!walletAddress) {
    console.error("Cüzdan adresi bulunamadı!");
    return [];
  }

  try {
    const alchemy = getAlchemyInstance(selectedNetwork); // Seçilen ağ için Alchemy oluştur
    console.log(`🔄 ${selectedNetwork} ağından token bilgileri alınıyor...`);

    // Token bakiyelerini al
    const balances = await alchemy.core.getTokenBalances(walletAddress);

    // 0 bakiyeli tokenleri filtrele
    const nonZeroBalances = balances.tokenBalances.filter(
      (token) => token.tokenBalance !== "0"
    );

    let formattedBalances = [];

    // Tüm tokenler için bilgileri al
    for (let token of nonZeroBalances) {
      let balance = token.tokenBalance;

      // Token'in metadata bilgilerini al
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

      // Token bakiyesini düzgün bir formata çevir
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      formattedBalances.push({
        name: metadata.name,
        balance: balance,
        symbol: metadata.symbol,
      });
    }

    return formattedBalances;
  } catch (error) {
    console.error(`⚠️ ${selectedNetwork} ağında token bilgileri alınırken hata oluştu:`, error);
    return [];
  }
};
