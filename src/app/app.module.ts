import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CommonLibModule } from 'common-lib';
import { CanpayModule } from 'common-lib';
import { environment } from '../environments/environment';
import { canyaAbi } from 'src/app/contracts';
import { CanCardsModule } from './can-cards/can-cards.module';
import { HomeModule } from './home/home.module';
import { CanPayComponent } from './can-pay/can-pay.component';

@NgModule({
  declarations: [
    AppComponent,
    CanPayComponent,
  ],
  imports: [
    BrowserModule,
    CommonLibModule,
    AppRoutingModule,
    CanCardsModule,
    HomeModule,
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
