import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '~app/services/authentication.service';
// import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  // emailFormControl = new FormControl("", [Validators.required, Validators.email]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router, // private _snackBar: MatSnackBar,
  ) {
    // Checks if session is valid, if it is then user is redirected to dashboard automatically
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter an email'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'You must enter a password'
      : this.email.hasError('email');
  }

  signIn = async () => {
    try {
      if (this.email.value && this.password.value) {
        /* this._snackBar.open('Signing you in, please wait', undefined, {
          duration: 2000,
        }); */
        await this.authenticationService.signInUser(this.email.value, this.password.value);
      }
    } catch (error) {
      throw error;
    }
  };
}
