import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public authenticationService: AuthenticationService, public router: Router) {
    // Checks if session is valid, if it is then user is redirected to dashboard automatically
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  signUp() {
    this.authenticationService.SignUp(
      this.loginFormGroup.value.email,
      this.loginFormGroup.value.password
    );
    this.loginFormGroup.setValue({
      email: '',
      password: ''
    });
  }

  signIn() {
    this.authenticationService.SignIn(
      this.loginFormGroup.value.email,
      this.loginFormGroup.value.password
    );
    this.loginFormGroup.setValue({
      email: '',
      password: ''
    });
  }


}
