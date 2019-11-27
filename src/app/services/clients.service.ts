import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClient() {
    return this.http.get('client');
  }

  addClient(payload) {
    return this.http.post('client', payload);
  }

  editClient(id, payload) {
    return this.http.put(`client/${id}`, payload);
  }

  deleteClient(id) {
    return this.http.delete(`client/${id}`);
  }
}
