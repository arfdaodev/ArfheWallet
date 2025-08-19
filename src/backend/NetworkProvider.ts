import EthereumNetwork from "./Ethereum";
import { NetworkIds } from "./Network";

class NetworkProvider {

  ethereumNetwork: EthereumNetwork | undefined;

  constructor(requestedNetworks: [number]) {
    if (requestedNetworks.includes(NetworkIds.Ethereum))
      this.ethInit();
  }

  ethInit() {
    if (this.ethereumNetwork == undefined) {
      this.ethereumNetwork = new EthereumNetwork();
    }
  }

  getEthNetwork(): EthereumNetwork | undefined {
    return this.ethereumNetwork
  }
}

export default NetworkProvider;