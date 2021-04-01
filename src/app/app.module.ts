import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authComponent } from './auth/auth.component';
import { ApplicationComponent } from './forms/e-application/e-application.component';
import { MissingItemComponent } from './forms/Missing Item/missingitem.component';
import { MissingPersonComponent } from './forms/Missing person/missingperson.component';
import { NOCComponent } from './forms/NOC/noc.component';
import { PoliceVerificationComponent } from './forms/Police Verification/policever.component';
import { TenentRegistrationComponent } from './forms/Tenent/tenentreg.component';
import { headerComponent } from './header/header.component';
import { UserPanalComponent } from './Userpanal/userpanal.component';

@NgModule({
  declarations: [
    AppComponent,
    authComponent,
    headerComponent,
    ApplicationComponent,
    MissingItemComponent,
    MissingPersonComponent,
    NOCComponent,
    PoliceVerificationComponent,
    TenentRegistrationComponent,
    UserPanalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
