import { BalanceComponent } from './balance/balance.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'about', component:AboutComponent},
  {path: 'balance', component:BalanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
