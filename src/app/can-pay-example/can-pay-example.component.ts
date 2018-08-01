import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Operation, setProcessResult, ProcessAction, CanPay, CanPayData, CanPayService } from 'canpay-lib';
import { DaoEthService } from 'src/app/services/dao.eth.service';

@Component({
  selector: 'app-can-pay-example',
  templateUrl: './can-pay-example.component.html',
  styleUrls: ['./can-pay-example.component.css']
})
export class CanPayExampleComponent {
  isVisible = true;

  canPay: CanPay = {
    // properties
    dAppName: 'CanYaDAO',
    operation: Operation.auth, // Authorise or Pay, Default is: Authorise
    recepient: environment.contracts.testAccount,
    amount: 0, // allow the user to enter amount through an input box
    minAmount: 1000, // Default is 1
    maxAmount: 50000, // Default is 'No Maximum'

    // Actions
    complete: this.completeCanPayUserActivation.bind(this),
    cancel: this.cancelCanPayUserActivation.bind(this),

    // Post Authorisation
    postAuthorisationProcessName: 'User Activation',
    startPostAuthorisationProcess: this.startCanPayUserActivation.bind(this),
    postAuthorisationProcessResults: null
  };

  constructor(private daoEthService: DaoEthService, private canPayService:CanPayService) { }

  startCanPayUserActivation(canPayData: CanPayData) {
    console.log(canPayData);
    this.daoEthService.createUserEscrow(canPayData.account, canPayData.amount)
      // setProcessResult is a helper utility that takes the returned 'tx' from the 'createUserEscrow' and set the appropriate result as failed or success tx.
      .then(setProcessResult.bind(this.canPay))
      .catch(setProcessResult.bind(this.canPay));

    /*
    // another way to set the result is as follows
    this.daoEthService.createUserEscrow(canPayData.amount)
      .then(tx =>
        this.CanPay.postAuthorisationProcessResults = {
          type: tx.status === 1 ? ProcessAction.success : ProcessAction.error,
          msg: tx.status === 1 ? null : 'Transaction Failed'
        })
      .catch(err => {
        this.CanPay.postAuthorisationProcessResults = {
          type: ProcessAction.error,
          msg: err.message || 'Transaction Failed'
        };
      });
      */
  }

  completeCanPayUserActivation(canPayData: CanPayData) {
    console.log(canPayData);
    this.isVisible = false;
  }

  cancelCanPayUserActivation(canPayData: CanPayData) {
    console.log(canPayData);
    this.isVisible = false;
  }
  
  modalCanPay(){ 
    this.canPayService.open(this.canPay);
  }
}
