import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '~app/services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public var: any;
  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) {}
  private applyCredentials = function(req) {
    // console.log(
    //   "TCL: ErrorInterceptor -> privateapplyCredentials -> localStorage.getItem('user')",
    //   localStorage.getItem('user'),
    // );

    // console.log('TCL: ErrorInterceptor -> privateapplyCredentials -> req', req);
    const ab = req.clone({
      headers: req.headers.headers.set('Authorization', 'Bearer ' + localStorage.getItem('user')),
    });
    return ab;
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.snackBar.open(err.error.error.message, '', {
            duration: 3000,
          });
          let token;
          let ssd = this.authenticationService.user.getIdToken().then(data => {
            token = data;
            console.log('TCL: ErrorInterceptor -> token', token);
            localStorage.setItem('user', token);

            this.var = this.applyCredentials(request);
            console.log('TCL: ErrorInterceptor -> this.var', this.var);
          });
          return next.handle(this.var);
          // this.authenticationService.saveUserToStorage(this.authenticationService.user);
          // auto logout if 401 response returned from api
          // this.authenticationService.signOutUser();
        } else if (err.status === 404) {
          this.snackBar.open(err.error.error.message, '', {
            duration: 3000,
          });
        } else if (err.status === 500) {
          this.snackBar.open(err.error.error.message, '', {
            duration: 3000,
          });
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }),
    );
  }
}
