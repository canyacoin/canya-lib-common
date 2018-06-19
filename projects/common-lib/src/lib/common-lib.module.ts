import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLibComponent } from './common-lib.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommonLibComponent, HeaderComponent],
  exports: [CommonLibComponent, HeaderComponent]
})
export class CommonLibModule { }
