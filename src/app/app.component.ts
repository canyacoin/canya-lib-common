import { Component } from '@angular/core';
import { canyaAbi } from 'src/app/contracts';
import { environment } from 'src/environments/environment';
import { Operation, setProcessResult } from 'common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  CanPay;

  title = 'app';

  constructor() {
    this.newCanPay(true);
  }

  newCanPay(isVisible) {
    this.CanPay = {
      isVisible: isVisible || !this.CanPay.isVisible,
      account: null,

      // properties
      dAppName: 'CanYaDAO',
      operation: Operation.auth,
      recepient: environment.contracts.canYaDao,
      amount: 0,
      postAuthorisationProcessName: 'User Activation',
      postAuthorisationProcessResults: null,

      // Use CanYaCoin contract that suits your needs local/test/prod
      // Default value is CanYaCoin contract for roposten test network
      canyaContract: {
        abi: canyaAbi,
        address: environment.contracts.canYaCoin
      },

      // actions
      startPostAuthorisationProcess: this.startCanPayUserActivation.bind(this),
      complete: this.completeCanPayUserActivation.bind(this),
      cancel: this.cancelCanPayUserActivation.bind(this)
    };
  }

  startCanPayUserActivation() {
    setTimeout(() => setProcessResult.call(this.CanPay, { status: 1 }), 2000);
  }

  completeCanPayUserActivation() {
    this.CanPay.isVisible = false;
  }

  cancelCanPayUserActivation() {
    this.CanPay.isVisible = false;
  }
}
