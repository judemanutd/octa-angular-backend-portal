import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '~app/services/authentication.service';
// import { NgProgress } from '@ngx-progressbar/core';

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

  // ngOnInit() {
  //   /** request started */
  //   this.ngProgress.start();
  // }
}
