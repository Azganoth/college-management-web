import { Person } from './person.model';
import { Subject } from './subject.model';

export interface Enrollment {
  subject: Subject;
  student: Person;
  grades: number[];
}
