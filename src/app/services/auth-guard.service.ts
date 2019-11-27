import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate = async () => {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  };
}
