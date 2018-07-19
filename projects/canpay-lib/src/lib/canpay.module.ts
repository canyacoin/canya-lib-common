import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanpayWizardComponent } from './canpay-wizard/canpay-wizard.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { EthService } from './services/eth.service';
import { FaqComponent } from './metamask/faq/faq.component';
import { InstructionsComponent } from './metamask/instructions/instructions.component';
import { LoadingStatusComponent } from './loading-status/loading-status.component';
import { BancorWcComponent } from './bancor-wc/bancor-wc.component';
import { CommaSepNumPipe } from './comma-sep-num.pipe';
import { PaymentAuthorisationComponent } from './payment-authorisation/payment-authorisation.component';
import { PaymentComponent } from './payment/payment.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { ProcessComponent } from './process/process.component';
import { CanpayModalComponent } from './canpay-modal/canpay-modal.component';
import { InputAmountComponent } from './input-amount/input-amount.component';
import { CanPayService } from './services/canpay.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CanYaCoinEthService } from './services/canyacoin-eth.service';

const COMPONENTS = [
  CanpayModalComponent,
  CanpayWizardComponent,
  MetamaskComponent,
  FaqComponent,
  InstructionsComponent,
  LoadingStatusComponent,
  BancorWcComponent,
  PaymentAuthorisationComponent,
  PaymentComponent,
  ProcessComponent,
  MsgBoxComponent,
  InputAmountComponent,
  CommaSepNumPipe
];

const PROVIDERS = [EthService, CanYaCoinEthService, CanPayService];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  entryComponents: [
    CanpayModalComponent
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: PROVIDERS
})
export class CanpayModule {
  static forRoot(config: any): ModuleWithProviders {
    console.log('canPayConfigs: ', config);
    return {
      ngModule: CanpayModule,
      providers: [{ provide: 'Config', useValue: config }]
    };
  }
}
