import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get('project');
  }

  addProject(payload) {
    return this.http.post('project', payload);
  }

  editProject(id, payload) {
    return this.http.put(`project/${id}`, payload);
  }

  deleteProject(id) {
    return this.http.delete(`project/${id}`);
  }

  addLogo(id, payload) {
    return this.http.post(`project/${id}/logo`, payload);
  }

  deleteLogo(id) {
    return this.http.delete(`project/${id}/logo`);
  }

  addCover(id, payload) {
    return this.http.post(`project/${id}/cover`, payload);
  }

  deleteCover(id) {
    return this.http.delete(`project/${id}/cover`);
  }
}
