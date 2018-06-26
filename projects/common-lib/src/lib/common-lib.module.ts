import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLibComponent } from './common-lib.component';
import { HeaderComponent } from './header/header.component';

import { KeepHtmlPipe } from './@pipe/keep-html.pipe';
import { LanguageService } from './@service/language.service';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [CommonLibComponent, HeaderComponent, KeepHtmlPipe, LanguageSwitchComponent],
  exports: [CommonLibComponent, HeaderComponent, KeepHtmlPipe, LanguageSwitchComponent]
})
export class CommonLibModule { }
