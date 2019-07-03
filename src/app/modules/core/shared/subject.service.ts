import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { Enrollment } from './enrollment.model';
import { Subject } from './subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = `${AppConfig.serverUrl}/subjects`;

  constructor(private http: HttpClient) { }

  post(subject: Subject): Promise<any> {
    return this.http.post(this.url, subject).toPromise();
  }

  postEnrollment(subjectId: number, studentId: number): Promise<any> {
    return this.http.post(`${AppConfig.serverUrl}/enrollments`, {subjectId, studentId}).toPromise();
  }

  get(id: number): Promise<Subject> {
    return this.http.get<Subject>(`${this.url}/${id}`).toPromise();
  }

  getAll(): Promise<Subject[]> {
    return this.http.get<Subject[]>(this.url).toPromise();
  }

  getAllEnrollments(id: number): Promise<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.url}/${id}/enrollments`).toPromise();
  }

  put(subject: Subject, id: number): Promise<void> {
    return this.http.put(`${this.url}/${id}`, subject).toPromise().then(() => null);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`).toPromise().then(() => null);
  }

  deleteEnrollment(subjectId: number, studentId: number): Promise<any> {
    return this.http.delete(`${this.url}/${subjectId}/${studentId}`).toPromise();
  }

}
