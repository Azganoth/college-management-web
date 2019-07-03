import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { Address } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url = `${AppConfig.serverUrl}/addresses`;

  constructor(private http: HttpClient) { }

  get(id: number): Promise<Address> {
    return this.http.get<Address>(`${this.url}/${id}`).toPromise();
  }

  getAll(): Promise<Address[]> {
    return this.http.get<Address[]>(this.url).toPromise();
  }

}
