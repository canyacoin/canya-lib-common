import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ICanPay, Step } from '../canpay-wizard/canpay-wizard.component';

export interface CanPayData {
  CanPay: ICanPay;
}

@Component({
  selector: 'canyalib-canpay-modal',
  templateUrl: './canpay-modal.component.html',
  styleUrls: ['./canpay-modal.component.scss']
})
export class CanpayModalComponent extends DialogComponent<CanPayData, boolean> {
  CanPay: ICanPay;
  step: any = {};
  Step = Step;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();
  }

  currentStep(step) {
    console.log('emitted step: ', step, this.step);
    this.step = step;
    if (this.CanPay.currentStep) {
      this.CanPay.currentStep(step);
    }
  }
}
