import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CanpayModule } from 'canpay-lib';
import { environment } from '../environments/environment';
import { canyaAbi } from 'src/app/contracts';
import { CanPayExampleComponent } from './can-pay-example/can-pay-example.component';
import { DaoEthService } from 'src/app/services/dao.eth.service';

@NgModule({
  declarations: [
    AppComponent,
    CanPayExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CanpayModule.forRoot({
      contracts: {
        useTestNet: environment.contracts.useTestNet,
        canyaCoinAddress: environment.contracts.canYaCoin,
        canyaAbi: canyaAbi
      }
    })
  ],
  providers: [DaoEthService],
  bootstrap: [AppComponent],
})

export class AppModule { }
