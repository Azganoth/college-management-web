import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = `${AppConfig.serverUrl}/students`;

  constructor(private http: HttpClient) { }

  post(student: Person): Promise<any> {
    return this.http.post(this.url, student).toPromise();
  }

  get(id: number): Promise<Person> {
    return this.http.get<Person>(`${this.url}/${id}`).toPromise();
  }

  getAll(): Promise<Person[]> {
    return this.http.get<Person[]>(this.url).toPromise();
  }

  put(student: Person, id: number): Promise<void> {
    return this.http.put(`${this.url}/${id}`, student).toPromise().then(() => null);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`).toPromise().then(() => null);
  }

}
