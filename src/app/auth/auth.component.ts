import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
// tslint:disable-next-line:class-name
export class authComponent {
  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if(form.value.password !== form.value.cpassword){
      return;
    }
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.authService.createUser(form.value.name, form.value.email, form.value.password, form.value.mnumber, form.value.anumber);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
