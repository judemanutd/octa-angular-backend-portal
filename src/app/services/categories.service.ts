import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get('category');
  }

  addCategory(payload) {
    return this.http.post('category', payload);
  }

  editCategory(id, payload) {
    return this.http.put(`category/${id}`, payload);
  }

  deleteCategory(id) {
    return this.http.delete(`category/${id}`);
  }
}
