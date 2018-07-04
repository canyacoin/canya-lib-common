import { Injectable, OnDestroy, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

declare let require: any;
const Web3 = require('web3');
declare var web3;

const canDecimals = 6;
const gas = { gasPrice: '8000000000', gas: '210000' };

export enum WalletType {
  metaMask = 'MetaMask',
  trust = 'Trust'
}

export enum NetworkType {
  main = 'Mainnet',
  ropsten = 'Ropsten',
  rinkeby = 'Rinkeby',
  localhost = 'Localhost',
  unknown = 'Unknown'
}

export enum Web3LoadingStatus {
  loading = 'Wallet loading is in progress',
  unableToConnectToSelectedNetwork = 'Unable to connect to the selected network. Check your provider configuration (Metamask or TrustWallet)',
  noMetaMask = 'Wallet is not connected.',
  noAccountsAvailable = 'Your wallet is locked or there are no accounts available.',
  wrongNetwork = 'Your wallet is connected to the wrong Network.',
  error = 'Something went wrong when connecting to your wallet',
  complete = 'Successfully connected to your wallet'
}

@Injectable()
export class EthService implements OnDestroy {

  web3js: any;
  accountInterval: any;
  canyaContract: any = null;
  netType: NetworkType;
  walletType: WalletType;

  public web3Status = new BehaviorSubject<Web3LoadingStatus>(Web3LoadingStatus.loading);
  public web3Status$ = this.web3Status.asObservable();

  public account = new BehaviorSubject<string>(null);
  public account$ = this.account.asObservable();

  constructor( @Inject('Config') private config: any = {}) {
    if (typeof web3 !== 'undefined') {

      this.web3js = new Web3(web3.currentProvider);

      this.setWalletType();

      try {
        this.web3js.eth.net.getId().then((id: number) => {
          console.log('Web3Service: Network retrieved: ID= ' + id);

          switch (id) {
            case 1:
              this.netType = NetworkType.main;
              break;
            case 3:
              this.netType = NetworkType.ropsten;
              break;
            case 4:
              this.netType = NetworkType.rinkeby;
              break;
            default:
              this.netType = NetworkType.unknown;
          }

          this.setUpAccounts();
          this.initCanYaContract();
        });

      } catch (e) {
        console.log('Web3Service: Error: ID');
        this.web3Status.next(Web3LoadingStatus.error);
      }
    } else {
      // this.setProvider(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
      this.web3Status.next(Web3LoadingStatus.noMetaMask);
    }

    setTimeout(() => {
      if (!this.netType) {
        this.web3Status.next(Web3LoadingStatus.unableToConnectToSelectedNetwork);
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.accountInterval) {
      clearInterval(this.accountInterval);
    }
  }

  private setWalletType(): WalletType {
    if (this.web3js.currentProvider.isMetaMask) {
      return this.walletType = WalletType.metaMask;
    }

    if (this.web3js.currentProvider.isTrust) {
      return this.walletType = WalletType.trust;
    }

    return this.walletType = null;
  }

  private setUpAccounts() {
    console.log('setUpAccounts...');
    if ((this.config.contracts.useTestNet && (this.netType === NetworkType.rinkeby
      || this.netType === NetworkType.ropsten || this.netType === NetworkType.unknown))
      || (!this.config.contracts.useTestNet && this.netType === NetworkType.main)) {
      console.log('Web3Service: Is: ', this.netType);
      this.web3js.eth.getAccounts().then((accs: string[]) => {
        console.log('Web3Service: Got accounts: ' + JSON.stringify(accs));
        this.account.next(accs[0]);
        this.web3Status.next(accs[0] ? Web3LoadingStatus.complete : Web3LoadingStatus.noAccountsAvailable);
        this.accountInterval = setInterval(() => this.checkAccountMetaMask(), 5000);
      });

      return;
    }

    this.web3Status.next(Web3LoadingStatus.wrongNetwork);
  }

  private checkAccountMetaMask() {
    console.log('checkAccountMetaMask..');
    this.web3js.eth.getAccounts().then((accs: string[]) => {
      console.log('Web3Service: loadedaccounts: ' + JSON.stringify(accs));
      if (accs[0] !== this.account.value) {
        console.log('Web3Service: new account found: ' + JSON.stringify(accs[0]));
        this.account.next(accs[0]);
        if (accs[0] !== undefined) { // && (this.web3Status.value !== Web3LoadingStatus.complete)
          this.web3Status.next(Web3LoadingStatus.complete);
          return;
        }

        this.web3Status.next(Web3LoadingStatus.noAccountsAvailable);
      }
    });
  }

  async getEthBalanceAsync(userAddress: string = this.account.value): Promise<string> {
    // TODO  - confirm useraddress has 0x
    const balance = await this.web3js.eth.getBalance(userAddress);
    if (balance) {
      console.log(balance);
      const tokens = this.web3js.utils.toBN(balance).toString();
      console.log('Eth Owned: ' + this.web3js.utils.fromWei(tokens, 'ether'));
      return Promise.resolve(tokens);
    }

    return Promise.reject(null);
  }

  async getCanYaBalance(userAddress: string = this.account.value): Promise<string> {
    console.log('getBalalnceOf: ', userAddress, this.canyaContract);
    try {
      if (userAddress) {
        const balance = await this.canyaContract.methods.balanceOf(userAddress).call();
        console.log('balance: ', balance);
        const t = this.web3js.utils.toBN(balance);
        return Promise.resolve(t.div(this.web3js.utils.toBN(1000000)).toString());
      }

      return Promise.resolve('0.00');
    } catch (error) {
      console.error('getBalance - error', error);
      return Promise.reject(error);
    }
  }

  initCanYaContract(abi = this.config.contracts.canyaAbi, address = this.config.contracts.canyaCoinAddress) {
    return this.canyaContract = this.createContractInstance(abi, address);
  }

  amountToCANTokens(amount) {
    return amount * (10 ** canDecimals);
  }

  gas() {
    return gas;
  }

  getAccount() {
    return this.account.value;
  }

  createContractInstance(abi, address) {
    console.log('createContractInstance: ', abi, address);
    if (!this.web3js) {
      console.log('Error createContractInstance, web3 provider not initialized');
      return;
    }

    return new this.web3js.eth.Contract(abi, address); // this.config.contracts.canYaCoin
  }

  getTransactionReceiptMined = (txHash, interval = 500, blockLimit = 0) => {
    const transactionReceiptAsync = (resolve, reject) => {
      web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
        if (error) {
          return reject(error);
        }

        if (receipt == null) {
          setTimeout(() => transactionReceiptAsync(resolve, reject), interval);
          return;
        }

        resolve(receipt);
      });
    };

    return new Promise(transactionReceiptAsync);
  }

  authoriseCANPayment(recepient, amount) {
    console.log('authoriseCANPayment: ', recepient, amount, this.account.value);
    return this.canyaContract.methods.approve(recepient, amount * (10 ** canDecimals)).send({ from: this.account.value, ...gas })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .then(tx => {
        tx.status = this.web3js.utils.hexToNumber(tx.status);
        return tx;
      });
  }

  payWithCAN(recepient, amount) {
    return this.canyaContract.methods.transfer(recepient, this.amountToCANTokens(amount)).send({ from: this.account.value, ...this.gas() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .then(tx => {
        tx.status = this.web3js.utils.hexToNumber(tx.status);
        return tx;
      });
  }
}
