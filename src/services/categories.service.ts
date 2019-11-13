import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  user = JSON.parse(localStorage.getItem("user"));
  headers = new HttpHeaders().set(
    "Authorization",
    `Bearer ${this.user.stsTokenManager.accessToken}`
  );

  getCategories() {
    return this.http.get(`${environment.baseUrl}/category`, {
      headers: this.headers
    });
  }

  addCategory(payload) {
    return this.http.post(`${environment.baseUrl}/category`, payload, {
      headers: this.headers
    });
  }

  editCategory(id, payload) {
    return this.http.put(`${environment.baseUrl}/category/${id}`, payload, {
      headers: this.headers
    });
  }

  deleteCategory(id) {
    return this.http.delete(`${environment.baseUrl}/category/${id}`, {
      headers: this.headers
    });
  }
}
