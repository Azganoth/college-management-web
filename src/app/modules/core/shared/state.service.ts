import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { City } from './city.model';
import { State } from './state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url = `${AppConfig.serverUrl}/states`;

  constructor(private http: HttpClient) { }

  get(id: number): Promise<State> {
    return this.http.get<State>(`${this.url}/${id}`).toPromise();
  }

  getAll(): Promise<State[]> {
    return this.http.get<State[]>(this.url).toPromise();
  }

  getAllCities(id: number): Promise<City[]> {
    return this.http.get<City[]>(`${this.url}/${id}/cities`).toPromise();
  }

}
