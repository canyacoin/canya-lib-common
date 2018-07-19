import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CanYaCoinEthService } from '../services/canyacoin-eth.service';

@Component({
  selector: 'canyalib-payment-authorisation',
  templateUrl: './payment-authorisation.component.html',
  styleUrls: ['./payment-authorisation.component.scss']
})
export class PaymentAuthorisationComponent implements OnInit {
  @Output() error = new EventEmitter();
  @Output() success = new EventEmitter();
  @Input() dAppName;
  @Input() recepient;
  @Input() amount = 0;
  isLoading = false;

  constructor(private canyaCoinEthService: CanYaCoinEthService) { }

  ngOnInit() { }

  authorise() {
    if (this.isLoading) { return; }

    this.isLoading = true;
    console.log('authCanPayment: ', this.recepient, this.amount);
    this.canyaCoinEthService.authoriseCANPayment(this.recepient, this.amount)
      .then(tx => tx.status === 0 ? this.error.emit('Transaction failed') : this.success.emit(tx))
      .catch(err => this.error.emit(err.message))
      .then(() => this.isLoading = false);

    return false;
  }

}
