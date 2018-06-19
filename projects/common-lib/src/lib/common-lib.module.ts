import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLibComponent } from './common-lib.component';
import { HeaderComponent } from './header/header.component';

import { KeepHtmlPipe } from './@pipe/keep-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommonLibComponent, HeaderComponent, KeepHtmlPipe],
  exports: [CommonLibComponent, HeaderComponent, KeepHtmlPipe]
})
export class CommonLibModule { }
