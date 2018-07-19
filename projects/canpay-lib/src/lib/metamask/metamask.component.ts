import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EthService, Web3LoadingStatus, WalletType } from '../services/eth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'canyalib-metamask',
  templateUrl: './metamask.component1.html',
  styleUrls: ['./metamask.component.scss']
})

export class MetamaskComponent implements OnInit {
  @Input() initLogin = true;
  @Output() loginResp = new EventEmitter();
  @Output() account = new EventEmitter<string>();
  //   status = 'loading';
  web3LoadingStatus = Web3LoadingStatus;
  web3State: Web3LoadingStatus;

  walletType: WalletType;
  walletTypes = WalletType;

  loading = true;

  ethSub: Subscription;
  accSub: Subscription;

  constructor(private ethService: EthService) { }

  async ngOnInit() {
    this.ethSub = this.ethService.web3Status$.subscribe((state: Web3LoadingStatus) => {
      console.log('state: ', state);
      this.web3State = state;
      if (this.web3State !== Web3LoadingStatus.loading) {
        this.walletType = this.ethService.walletType;
        this.accSub = this.ethService.account$.subscribe((acc: string) => {
          if (!acc) { return; }
          console.log('accSub: ', acc);
          this.loading = true;
          this.account.emit(acc);
        });
      }
    });
  }
}

