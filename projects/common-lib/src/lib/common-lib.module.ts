import { NgModule } from '@angular/core';
import { CommonLibComponent } from './common-lib.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
  ],
  declarations: [CommonLibComponent, HeaderComponent],
  exports: [CommonLibComponent, HeaderComponent]
})
export class CommonLibModule { }
