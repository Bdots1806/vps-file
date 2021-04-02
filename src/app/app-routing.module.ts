import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { authComponent } from './auth/auth.component';
import { FormlistComponent } from './form-list/form-list.component';
import { ApplicationComponent } from './forms/e-application/e-application.component';
import { MissingItemComponent } from './forms/Missing Item/missingitem.component';
import { MissingPersonComponent } from './forms/Missing person/missingperson.component';
import { NOCComponent } from './forms/NOC/noc.component';
import { PoliceVerificationComponent } from './forms/Police Verification/policever.component';
import { TenentRegistrationComponent } from './forms/Tenent/tenentreg.component';
import { UserPanalComponent } from './Userpanal/userpanal.component';

const routes: Routes = [
  { path: 'login', component: authComponent },
  { path: 'signup', component: authComponent },
  { path: 'e-application', component: ApplicationComponent },
  { path: 'MissItem', component: MissingItemComponent},
  { path: 'MissPerson', component: MissingPersonComponent},
  { path: 'NOC', component: NOCComponent},
  { path: 'PoliceVerification', component: PoliceVerificationComponent},
  { path: 'TenentReg', component: TenentRegistrationComponent},
  { path: 'userpanal', component: UserPanalComponent},
  { path: 'applist', component: FormlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
