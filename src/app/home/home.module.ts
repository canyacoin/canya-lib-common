import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { CommonLibModule } from 'common-lib';

@NgModule({
  imports: [
    CommonModule,
    CommonLibModule
  ],
  declarations: [
    ContainerComponent,
  ]
})
export class HomeModule { }
