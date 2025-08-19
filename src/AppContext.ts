import React from "react";
import { NetworkIds } from "./backend/Network";
import NetworkProvider from "./backend/NetworkProvider";
import AccountManager from "./backend/AccountManager";

export const WalletContext = React.createContext<AppContext | undefined>(undefined);

export class AppContext {
  
  // accountsManager
  accountManager: AccountManager;
  // privateKey initialized from storageProvider.
  networkProvider: NetworkProvider;
  // storage_provider

  constructor() {
    this.networkProvider = new NetworkProvider([
      NetworkIds.Ethereum
      // No other networks for now, at least 'til "NetworkProvider" stabilizes.
    ]);

    this.accountManager = new AccountManager();
  }
}