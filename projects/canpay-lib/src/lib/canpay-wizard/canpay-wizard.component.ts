import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CanYaCoinEthService } from '../services/canyacoin-eth.service';

export enum Step {
  metamask = 0,
  paymentAmount = 1,
  balanceCheck = 2,
  buyCan = 3,
  authorisation = 4,
  payment = 5,
  process = 6,
  confirmation = 7,
  completed = 8
}

export enum Operation {
  auth = 'Authorise',
  pay = 'Pay'
}

export enum ProcessAction {
  success = 0,
  error = 1
}

export enum View {
  Normal,
  Compact
}

export interface ProcessActionResult {
  type: ProcessAction;
  msg: string;
}

export interface Contract {
  abi: any;
  address: string;
}

export interface CanPay {
  dAppName: string;
  operation?: Operation;
  recepient: string;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  postAuthorisationProcessName?: string;
  postAuthorisationProcessResults?: ProcessActionResult;
  canyaContract?: Contract;
  startPostAuthorisationProcess?: Function;
  complete: Function;
  cancel?: Function;
  currentStep?: Function;
}

export function setProcessResult(txOrErr) {
  this.postAuthorisationProcessResults = {
    type: txOrErr.status !== 1 ? ProcessAction.error : ProcessAction.success,
    msg: txOrErr.status !== 1 ? (txOrErr.message || 'Transaction failed') : null
  };
}

export interface CanPayData {
  currStep: Step;
  amount: number;
  account: string;
  balance: number;
}

@Component({
  selector: 'canyalib-canpay',
  templateUrl: './canpay-wizard.component.html',
  styleUrls: ['./canpay-wizard.component.scss'],
  // encapsulation: ViewEncapsulation.Native
})
export class CanpayWizardComponent implements OnInit {
  @Output() complete = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() startPostAuthorisationProcess = new EventEmitter();
  @Output() currentStep = new EventEmitter();

  @Input() view = View.Normal;
  @Input() postAuthorisationProcessName;
  @Input() operation = Operation.auth;
  @Input() recepient;
  @Input() dAppName;
  @Input() amount = 0;
  @Input() minAmount = 0;
  @Input() maxAmount = 0;

  @Input() set canyaContract(canyaContract: Contract) {
    console.log('setting up canyaContract: ', canyaContract);
    this.canyaCoinEthService.initContract(canyaContract.abi, canyaContract.address);
  }

  @Input() set postAuthorisationProcessResults(postAuthorisationProcessResults: ProcessActionResult) {
    this.doCompletePostAuthorisationProcess(postAuthorisationProcessResults);
  }

  View = View;
  Step = Step; // to access the enum from the .html template
  errMsg: string;
  steps: Array<any>;
  currStep: Step;
  isLoading = false;
  balance = 0;
  account: string;
  confirmationDlg = {
    type: 'success',
    title: 'Sweet, payment done!',
    controls: {
      ok: true
    }
  };
  insufficientBalance = false;
  processSummaryMsg: string;

  constructor(private canyaCoinEthService: CanYaCoinEthService) { }

  ngOnInit() {
    this.steps = [
      {
        name: 'Metamask',
        value: Step.metamask,
        active: true
      },
      {
        name: 'Pay Amount',
        value: Step.paymentAmount,
        active: !this.amount
      },
      {
        name: 'Balance Check',
        value: Step.balanceCheck,
        active: true
      },
      {
        name: 'Authorisation',
        value: Step.authorisation,
        active: this.operation === Operation.auth
      },
      {
        name: 'Payment',
        value: Step.payment,
        active: this.operation === Operation.pay
      },
      {
        name: this.postAuthorisationProcessName,
        value: Step.process,
        active: !!this.postAuthorisationProcessName
      },
      {
        name: 'Confirmation',
        value: Step.confirmation,
        active: true
      }
    ].filter(step => step.active);

    this.updateCurrentStep(this.steps.find(step => step.active === true).value);
    console.log('step: ', this.currStep);

    const validationErrors = [];
    if (!this.dAppName) {
      validationErrors.push('Missing dAppName');
    }

    if (!this.recepient) {
      validationErrors.push('Missing recepient address');
    }

    if (validationErrors.length) {
      this.error(validationErrors.join(' | '), false);
    }

    this.updateProcessSummaryMsg();
  }

  updateProcessSummaryMsg() {
    this.processSummaryMsg = `${this.operation} ${this.dAppName} ${this.operation === 'Authorise' ? 'to withdraw' : ''}` +
      ` ${this.amount ? this.amount + ' CAN' : ''}` +
      ` ${this.postAuthorisationProcessName ? 'for the ' + this.postAuthorisationProcessName : ''}`;
  }

  updateCurrentStep(step) {
    this.currStep = step;
    this.currentStep.emit(step);
  }

  setAccount(_acc) {
    console.log('setAccount: ', _acc);
    this.account = _acc;
    setTimeout(() => !this.amount ? this.updateCurrentStep(Step.paymentAmount) : this.checkBalance(_acc), 200);
  }

  setAmount(amount) {
    console.log('setAmount: ', amount);
    this.amount = amount;
    this.checkBalance(this.account);
    this.updateProcessSummaryMsg();
  }

  checkBalance(_acc) {
    this.updateCurrentStep(Step.balanceCheck);
    this.isLoading = true;

    this.canyaCoinEthService.getCanYaBalance()
      .then(_balance => {
        console.log('balance: ', _balance);
        this.balance = Number(_balance);
        this.account = this.canyaCoinEthService.getOwnerAccount();
        this.insufficientBalance = Number(_balance) < this.amount;
        if (!this.insufficientBalance) {
          this.updateCurrentStep(this.operation === Operation.auth ? Step.authorisation : Step.payment);
        }
      })
      .catch(err => this.error('Unable to retrieve user CAN balance!'))
      .then(() => this.isLoading = false);
  }

  notifyPaymentAuthorised(tx) {
    console.log('authorisedTx: ', tx);
    this.updateCurrentStep(this.postAuthorisationProcessName ? Step.process : Step.confirmation);
  }

  notifyPaymentCollected(tx) {
    console.log('paidTx: ', tx);
    this.updateCurrentStep(this.postAuthorisationProcessName ? Step.process : Step.confirmation);
  }

  doStartPostAuthorisationProcess() {
    this.startPostAuthorisationProcess.emit(this.canPayData());
  }

  doCompletePostAuthorisationProcess(postAuthorisationProcessResults) {
    if (!postAuthorisationProcessResults) { return; }

    if (postAuthorisationProcessResults.type === ProcessAction.success) {
      this.updateCurrentStep(Step.confirmation);
      return;
    }

    if (postAuthorisationProcessResults.type === ProcessAction.error) {
      return this.error(postAuthorisationProcessResults.msg);
    }
  }

  canPayData(): CanPayData {
    return {
      currStep: this.currStep,
      amount: this.amount,
      account: this.account,
      balance: this.balance
    };
  }

  doCancel() {
    this.cancel.emit(this.canPayData());
  }

  finish() {
    this.updateCurrentStep(Step.completed);
    this.complete.emit(this.canPayData());
  }

  error(msg, autoDismiss = true) {
    this.errMsg = msg;
    if (autoDismiss) {
      setTimeout(() => this.errMsg = null, 8000);
    }
  }

}
