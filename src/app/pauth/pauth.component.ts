import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './pauth.service';

@Component({
  selector: 'app-pauth',
  templateUrl: './pauth.component.html',
  styleUrls: ['./pauth.component.css']
})
// tslint:disable-next-line:class-name
export class pauthComponent {
  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if(form.value.password !== form.value.cpassword){
      return;
    }
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.authService.createUser(form.value.name, form.value.username, form.value.password, form.value.pincode);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.authService.login(form.value.username, form.value.password);
  }
}
