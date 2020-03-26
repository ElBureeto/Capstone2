import { AboutComponent } from './about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    AboutComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
