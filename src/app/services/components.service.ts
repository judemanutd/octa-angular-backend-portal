import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  constructor(private http: HttpClient) {}

  getcomponents(id) {
    return this.http.get(`project/${id}/component`);
  }

  getSingleComponent(cId, pId) {
    return this.http.get(`project/${pId}/component/${cId}`);
  }

  addComponent(id, payload) {
    return this.http.post(`project/${id}/component`, payload);
  }

  editComponent(pId, cId, payload) {
    return this.http.put(`project/${pId}/component/${cId}`, payload);
  }

  deleteProject(id) {
    return this.http.delete(`project/${id}`);
  }

  addLogo(pId, cId, payload) {
    return this.http.post(`project/${pId}/component/${cId}/logo`, payload);
  }

  addGallery(pId, cId, payload) {
    return this.http.post(`project/${pId}/component/${cId}/gallery`, payload);
  }

  deleteLogo(pId, cId) {
    return this.http.delete(`project/${pId}/component/${cId}/logo`);
  }

  addCover(pId, cId, payload) {
    return this.http.post(`project/${pId}/component/${cId}/cover`, payload);
  }

  deleteCover(pId, cId) {
    return this.http.delete(`project/${pId}/component/${cId}/cover`);
  }

  deleteGallery(pId, cId, gId) {
    return this.http.delete(`project/${pId}/component/${cId}/gallery/${gId}`);
  }

  getAllComponenets() {
    return this.http.get(`component/select`);
  }
}
