import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationCheck } from './Services/AuthorizationCheck';
import { AuthenticationService } from './Services/authentication.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  message: string;
  subscription: Subscription;
  AuthCheck: boolean;
  constructor(private route: Router, private authenticationService: AuthenticationService, private acheck: AuthorizationCheck) {
    this.AuthCheck = acheck.LoggedIn();
  }

  ngOnInit() {
    this.AuthCheck = this.acheck.LoggedIn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  go() {
    this.route.navigate(['/login']); // navigate to other page
    window.location.reload();
  }
  go2() {
    this.authenticationService.logout();
    window.location.reload();
  }
}
