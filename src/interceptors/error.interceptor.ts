import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '~services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public var: any;
  constructor(private authenticationService: AuthenticationService) {}
  private applyCredentials = function(req) {
    // console.log(
    //   "TCL: ErrorInterceptor -> privateapplyCredentials -> localStorage.getItem('user')",
    //   localStorage.getItem('user'),
    // );

    // console.log('TCL: ErrorInterceptor -> privateapplyCredentials -> req', req);
    const ab = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('user')),
    });
    console.log('applyCred');
    return ab;
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          let token;
          let ssd = this.authenticationService.user.getIdToken().then(data => {
            token = data;
            localStorage.setItem('user', token);
            // const newRequest = request.clone({
            //   // url: `${environment.baseUrl}/${request.url}`,
            //   headers: request.headers.set('Authorization', `Bearer ${users}`),
            // });
            // console.log('TCL: ErrorInterceptor -> constructor -> newRequest', newRequest);

            this.var = this.applyCredentials(request);
            console.log('end of interceptor');
          });
          return next.handle(this.var);
          // this.authenticationService.saveUserToStorage(this.authenticationService.user);
          // auto logout if 401 response returned from api
          // this.authenticationService.signOutUser();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }),
    );
  }
}
