import { Wallet, HDNodeWallet } from "ethers";

export default class Account {
  name: string | undefined;
  entropy: string | undefined;

  private_key: string | undefined;
  public_key: string | undefined;

  ethers_wallet: HDNodeWallet | undefined;

  constructor() {

  }

  static Random(name: string): Account {
    const account = new Account();
    
    account.ethers_wallet = Wallet.createRandom();
    const mnemonic_obj = account.ethers_wallet.mnemonic;

    account.entropy = mnemonic_obj?.entropy!!;
    account.name = name;
    account.Init();

    return account;
  }

  static From(entropy: string | undefined, mnemonic: string | undefined): Account {
    const account = new Account();
    
    account.entropy = entropy;

    account.Init();

    return account;
  }

  Init() {
    if (this.ethers_wallet == undefined) {
      console.error("Account not initialized...");
      return;
    }

    this.private_key = this.ethers_wallet.privateKey;
    this.public_key = this.ethers_wallet.publicKey;
  }

  GetWords(): string[] | undefined {
    return this.ethers_wallet?.mnemonic?.phrase.split(" ");
  }

  GetPubKey(): string | undefined {
    return this.ethers_wallet?.publicKey;
  }

  SetName(name: string) {
    this.name = name;
  }

  GetName(): string {
    return this.name ?? "";
  }
}