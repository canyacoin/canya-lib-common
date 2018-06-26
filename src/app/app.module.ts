import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CommonLibModule } from 'common-lib';
import { CanCardsModule } from './can-cards/can-cards.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonLibModule,
    AppRoutingModule,
    CanCardsModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
