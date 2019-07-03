import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { personGender } from '../../../core/shared/person.gender';
import { Person } from '../../../core/shared/person.model';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {

  title: string;
  person: Person;
  personGender = personGender;

  constructor(
    private dialogRef: MatDialogRef<PersonInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      specialization: string,
      person: Person
    }
  ) { }

  ngOnInit() {
    this.title = `Mostrando informações do ${this.data.specialization} com id [${this.data.person.id}]`;
    this.person = this.data.person;
  }

  close() {
    this.dialogRef.close();
  }

}
