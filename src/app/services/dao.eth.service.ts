import { Injectable } from '@angular/core';
import { EthService } from 'canpay-lib';
import { daoAbi } from 'src/app/contracts';
import { environment } from '../../environments/environment';

declare let require: any;

@Injectable()
export class DaoEthService extends EthService {
  daoContract: any;

  constructor() {
    super();
    this.daoContract = this.createContractInstance(daoAbi, environment.contracts.canYaDao);
  }

  createUserEscrow(fromAccount = this.account.value, amount) {
    console.log('createUserEscrow: ', this.daoContract, fromAccount, amount);
    return this.daoContract.methods.createUserEscrow(this.amountToCANTokens(amount)).send({ from: fromAccount, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .then(tx => {
        console.log('createUserEscrowTx: ', tx);
        tx.status = this.web3js.utils.hexToNumber(tx.status);
        return tx;
      });
  }

  balanceOfUser(user = this.account.value) {
    return this.daoContract.methods.balanceOfUser(user).call();
  }

  balanceOfApp(appId) {
    return this.daoContract.methods.balanceOfApp(this.web3js.utils.fromAscii(appId)).call();
  }

}
