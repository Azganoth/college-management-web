import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  url = `${AppConfig.serverUrl}/professors`;

  constructor(private http: HttpClient) { }

  post(professor: Person): Promise<any> {
    return this.http.post(this.url, professor).toPromise();
  }

  get(id: number): Promise<Person> {
    return this.http.get<Person>(`${this.url}/${id}`).toPromise();
  }

  getAll(): Promise<Person[]> {
    return this.http.get<Person[]>(this.url).toPromise();
  }

  put(professor: Person, id: number): Promise<void> {
    return this.http.put(`${this.url}/${id}`, professor).toPromise().then(() => null);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`).toPromise().then(() => null);
  }

}
