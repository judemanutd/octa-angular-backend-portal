import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '~environments/environment';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('user');

    if (!user) return throwError(new Error('User is not logged in'));

    const newRequest = req.clone({
      url: `${environment.baseUrl}/${req.url}`,
      headers: req.headers.set('Authorization', `Bearer ${user}`),
    });
    return next.handle(newRequest);
  }
}
