import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommonLibComponent } from './common-lib.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { KeepHtmlPipe } from './@pipe/keep-html.pipe';
import { LanguageService } from './@service/language.service';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    LanguageService
  ],
  declarations: [
    CommonLibComponent,
    HeaderComponent,
    KeepHtmlPipe,
    LanguageSwitchComponent
  ],
  exports: [
    CommonLibComponent,
    HeaderComponent,
    KeepHtmlPipe,
    LanguageSwitchComponent,
    TranslateModule
  ]
})

export class CommonLibModule {}
