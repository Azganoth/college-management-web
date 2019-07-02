import { Address } from './address.model';

export interface Person {
  id?: number;
  name: string;
  gender: any;
  birthDate: Date;
  email?: string;
  phones: string[];
  address: Address;
}
