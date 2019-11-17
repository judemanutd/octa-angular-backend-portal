import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '~services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authenticationService: AuthenticationService, public router: Router) {}

  signOut = async event => {
    await this.authenticationService.signOutUser();
    await this.router.navigate(['/']);
  };
}
