import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'canyalib-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss']
})
export class InputAmountComponent {
  @Output() amountUpdate = new EventEmitter();
  @Output() error = new EventEmitter();
  @Input() minAmount = 1;
  @Input() maxAmount = 0;

  amount: number;

  constructor() { }

  onAmountKeyUp(event) {
    if ((event.keyCode !== 8 && event.keyCode < 47) || event.keyCode > 58) { return false; }
    this.amount = Number(event.target.value);
  }

  setAmount() {
    const amount = Number(this.amount);
    if (isNaN(amount) || amount < this.minAmount || (this.maxAmount && amount > this.maxAmount)) {
      const minAmountMsg = this.minAmount ? ', min allowed amount is ' + this.minAmount + ' CAN' : '';
      const maxAmountMsg = this.maxAmount ? ', max allowed amount is ' + this.maxAmount + ' CAN.' : '.';
      this.error.emit('Invalid payment amount' + minAmountMsg);
      return;
    }

    this.error.emit();
    this.amountUpdate.emit(amount);
  }
}
