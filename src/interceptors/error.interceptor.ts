import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'firebase';

import { AuthenticationService } from '~services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private user: User;
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('TCL: ErrorInterceptor -> constructor -> request', request);
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          //       let token;
          // let ssd = user.getIdToken().then(data => {
          //   token = data;
          //   localStorage.setItem('user', token);
          // });
          // auto logout if 401 response returned from api
          // this.authenticationService.signOutUser();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }),
    );
  }
}
