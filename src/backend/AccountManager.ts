import Account from "./Account";

export default class AccountManager {
  // Active account index.
  active: number;
  accounts: Account[];

  constructor() {
    // Initialize empty, first.
    // TODO: After the storageProvider is done, use there to store these.
    this.active = -1;
    this.accounts = [];
  }

  CreateAccount(): number {
    let account = Account.Random(this.CreateRandomAccountName());
    let index = this.AddAccount(account);

    if (this.active == -1 || this.active != index) {
      this.active = index;
    }

    return index;
  }

  AddAccount(account: Account): number {
    if (account.entropy == undefined) {
      console.error("Account to be added returned undefined. Please check.");
      return -1;
    }

    let index = this.accounts.push(account) - 1;

    if (this.active == -1 || this.active != index) {
      this.active = index;
    }

    return index;
  }

  RemoveAccount(account_index: number) {
    if (this.accounts.length <= account_index) {
      console.error("Account does not already exist. Returning...");
      return;
    }
    
    this.accounts.splice(account_index, 1);
    
    if (this.active == account_index)
      this.active = -1;
  }

  GetActiveIndex(): number {
    return this.active;
  }

  GetActive(): Account | undefined {
    if (this.active < 0 || this.active >= this.accounts.length) {
      return undefined;
    }
    return this.accounts[this.active];
  }

  private CreateRandomAccountName(): string {
    const current_len = this.accounts.length + 1;
    return "New User #" + current_len;
  }
}