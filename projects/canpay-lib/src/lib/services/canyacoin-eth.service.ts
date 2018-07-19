import { Injectable, OnDestroy, Inject } from '@angular/core';
import { EthService } from './eth.service';
import { CanYaCoin } from '../contracts';
import merge from 'lodash.merge';

const DEFAULT_CONFIGS = {
  useTestNet: false,
  contracts: {
    canyaCoinAddress: '',
    canyaCoinAbi: CanYaCoin.abi
  }
};

@Injectable()
export class CanYaCoinEthService extends EthService {
  canyaContract: any;

  constructor( @Inject('Config') private config: any = {}) {
    super({ useTestNet: config.useTestNet });
    this.config = merge(DEFAULT_CONFIGS, config);
    this.initContract();
  }

  initContract(abi = this.config.contracts.canyaCoinAbi, address = this.config.contracts.canyaCoinAddress) {
    console.log('CanYaCoinEthService configs: ', this.config);
    return this.canyaContract = this.createContractInstance(abi, address);
  }

  async getCanYaBalance(userAddress: string = this.getOwnerAccount()): Promise<string> {
    console.log('CanYaCoinEthService: getCanYaBalance: ', userAddress, this.canyaContract);
    try {
      if (userAddress) {
        const balance = await this.canyaContract.methods.balanceOf(userAddress).call();
        console.log('CAN balance: ', balance);
        const t = this.web3js.utils.toBN(balance);
        return Promise.resolve(t.div(this.web3js.utils.toBN(1000000)).toString());
      }

      return Promise.resolve('0.00');
    } catch (error) {
      console.error('CanYaCoinEthService: getCanYaBalance - error', error);
      return Promise.reject(error);
    }
  }

  authoriseCANPayment(toRecepient, amount, from = this.getOwnerAccount()) {
    console.log('CanYaCoinEthService: authoriseCANPayment: ', from, toRecepient, amount);
    return this.canyaContract.methods.approve(toRecepient, this.amountToCANTokens(amount)).send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .then(tx => {
        tx.status = this.web3js.utils.hexToNumber(tx.status);
        return tx;
      });
  }

  payWithCAN(toRecepient, amount, from = this.getOwnerAccount()) {
    console.log('CanYaCoinEthService: payWithCAN: ', from, toRecepient, amount);
    return this.canyaContract.methods.transfer(toRecepient, this.amountToCANTokens(amount)).send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .then(tx => {
        tx.status = this.web3js.utils.hexToNumber(tx.status);
        return tx;
      });
  }
}
