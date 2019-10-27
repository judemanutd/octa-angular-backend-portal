import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('X-CustomHeader', 'custom header value');

  getCategories() {
    return this.http.get(`${environment.baseUrl}/categories`, {
      headers: this.headers,
    });
  }
}
