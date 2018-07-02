import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

import { CommonLibModule } from 'common-lib';
import { CanpayModule } from 'common-lib';
import { environment } from '../environments/environment';
import { canyaAbi } from 'src/app/contracts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonLibModule,
    CanpayModule.forRoot({
      contracts: {
        useTestNet: environment.contracts.useTestNet,
        canyaCoinAddress: environment.contracts.canYaCoin,
        canyaAbi: canyaAbi
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
