import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  constructor(private http: HttpClient) {}

  getTechnologies() {
    return this.http.get('technology');
  }

  addTechnology(payload) {
    return this.http.post('technology', payload);
  }

  editTechnology(id, payload) {
    return this.http.put(`technology/${id}`, payload);
  }

  deleteTechnology(id) {
    return this.http.delete(`technology/${id}`);
  }
}
