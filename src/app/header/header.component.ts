import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// tslint:disable-next-line:class-name
export class headerComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
