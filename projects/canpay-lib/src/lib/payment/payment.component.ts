import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EthService } from '../services/eth.service';

@Component({
  selector: 'canyalib-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Output() error = new EventEmitter();
  @Output() success = new EventEmitter();
  @Input() dAppName;
  @Input() recepient;
  @Input() amount = 0;
  isLoading = false;

  constructor(private ethService: EthService) { }

  ngOnInit() { }

  pay() {
    if (this.isLoading) { return; }

    this.isLoading = true;
    this.ethService.payWithCAN(this.recepient, this.amount)
      .then(tx => tx.status === 0 ? this.error.emit('Transaction failed') : this.success.emit(tx))
      .catch(err => this.error.emit(err.message))
      .then(() => this.isLoading = false);

    return false;
  }
}
