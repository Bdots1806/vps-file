import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authComponent } from './auth/auth.component';
import { FormlistComponent } from './form-list/form-list.component';
import { ApplicationComponent } from './forms/e-application/e-application.component';
import { MissingItemComponent } from './forms/Missing Item/missingitem.component';
import { MissingPersonComponent } from './forms/Missing person/missingperson.component';
import { NOCComponent } from './forms/NOC/noc.component';
import { PoliceVerificationComponent } from './forms/Police Verification/policever.component';
import { TenentRegistrationComponent } from './forms/Tenent/tenentreg.component';
import { UserPanalComponent } from './Userpanal/userpanal.component';
import { AuthGuard } from './auth/auth.guard';
import { pauthComponent } from './pauth/pauth.component';
import { ChallanComponent } from './forms/e-challan/challan.component';
import { IComponent } from './welcome/wecome.component';
const routes: Routes = [
  { path: '', component: IComponent },
  { path: 'login', component: authComponent },
  { path: 'signup', component: authComponent },
  { path: 'plogin', component: pauthComponent },
  { path: 'challan', component: ChallanComponent },
  { path: 'e-application', component: ApplicationComponent, canActivate: [AuthGuard] },
  { path: 'MissItem', component: MissingItemComponent, canActivate: [AuthGuard]},
  { path: 'MissPerson', component: MissingPersonComponent, canActivate: [AuthGuard]},
  { path: 'NOC', component: NOCComponent, canActivate: [AuthGuard]},
  { path: 'PoliceVerification', component: PoliceVerificationComponent, canActivate: [AuthGuard]},
  { path: 'TenentReg', component: TenentRegistrationComponent, canActivate: [AuthGuard]},
  { path: 'userpanal', component: UserPanalComponent, canActivate: [AuthGuard]},
  { path: 'applist', component: FormlistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
