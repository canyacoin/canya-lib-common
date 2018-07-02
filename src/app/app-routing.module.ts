import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent as CanCardsContainer } from './can-cards/container.component';
import { ContainerComponent as HomeContainer } from './home/container.component';
import { CanPayComponent } from 'src/app/can-pay/can-pay.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeContainer, },
  { path: 'can-cards', component: CanCardsContainer, },
  { path: 'can-pay', component: CanPayComponent, },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
