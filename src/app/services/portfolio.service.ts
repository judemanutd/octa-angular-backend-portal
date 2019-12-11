import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getPortfolios() {
    return this.http.get('portfolio');
  }

  addPortfolio(payload) {
    return this.http.post('portfolio', payload);
  }

  editPortfolio(id, payload) {
    return this.http.put(`portfolio/${id}`, payload);
  }

  deletePortfolio(id) {
    return this.http.delete(`portfolio/${id}`);
  }
  getSinglePortfolio(id) {
    return this.http.get(`portfolio/${id}`);
  }
}
