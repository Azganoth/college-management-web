import { City } from './city.model';

export interface Address {
  id?: number;
  street: string;
  number?: string;
  numberAptRoom?: string;
  complement?: string;
  neighborhood?: string;
  postalCode: string;
  city: City;
}
