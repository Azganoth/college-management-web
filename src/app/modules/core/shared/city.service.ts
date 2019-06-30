import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { City } from './city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = `${AppConfig.serverUrl}/cities`;

  constructor(private http: HttpClient) { }

  get(id: number): Promise<City> {
    return this.http.get<City>(`${this.url}/${id}`).toPromise();
  }

  getAll(): Promise<City[]> {
    return this.http.get<City[]>(this.url).toPromise();
  }

}
