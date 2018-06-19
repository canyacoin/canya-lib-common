import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { CommonLibModule } from 'common-lib';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonLibModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    HeaderComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const header = createCustomElement(HeaderComponent, { injector: this.injector })
    customElements.define('app-header', header)
  }
}
