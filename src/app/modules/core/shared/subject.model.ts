import { Person } from './person.model';

export interface Subject {
  id?: number;
  name: string;
  description?: string;
  day: string;
  year: number;
  professor: Person;
}
