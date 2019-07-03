import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { from as ObservableFrom } from 'rxjs';
import { City } from '../../../core/shared/city.model';
import { CityService } from '../../../core/shared/city.service';
import { Person } from '../../../core/shared/person.model';
import { State } from '../../../core/shared/state.model';
import { StateService } from '../../../core/shared/state.service';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent implements OnInit {

  title: string;
  personForm: FormGroup;
  personGender = [
    {value: 'UNKNOWN', viewValue: 'Desconhecido'},
    {value: 'MALE', viewValue: 'Masculino'},
    {value: 'FEMALE', viewValue: 'Feminino'},
    {value: 'UNDEFINED', viewValue: 'Indefinido'}
  ];
  today = new Date(Date.now());
  cities: City[];
  states: State[];

  constructor(
    private dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subject: string,
      person: Person
    },
    private cityService: CityService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.title = this.data.person.id
      ? `Modificando o ${this.data.subject} ${this.data.person.id}`
      : `Cadastrando um novo ${this.data.subject}`;
    this.initializePerson().then();
  }

  async initializePerson() {
    this.states = await this.stateService.getAll();
    if (this.data.person.id) {
      this.cities = await this.stateService.getAllCities(this.data.person.address.city.state.id);
    }
    this.personForm = new FormGroup({
      name: new FormControl(this.data.person.name, Validators.required),
      gender: new FormControl(this.data.person.gender, Validators.required),
      birthDate: new FormControl(this.data.person.birthDate, Validators.required),
      email: new FormControl(this.data.person.email, Validators.email),
      phones: new FormControl(this.data.person.phones, [
        Validators.required,
        Validators.pattern('^(\\(?[1-9]\\d\\)?)? ?9?[2-9]\\d{3}[ -]?\\d{4}' +
          '(, ?(\\(?[1-9]\\d\\)?)? ?9?[2-9]\\d{3}[ -]?\\d{4})*$')
      ]),
      address: new FormGroup({
        street: new FormControl(this.data.person.id ? this.data.person.address.street : '',
          Validators.required),
        number: new FormControl(
          this.data.person.id ? this.data.person.address.number : ''),
        numberAptRoom: new FormControl(
          this.data.person.id ? this.data.person.address.numberAptRoom : ''),
        complement: new FormControl(
          this.data.person.id ? this.data.person.address.complement : ''),
        neighborhood: new FormControl(
          this.data.person.id ? this.data.person.address.neighborhood : ''),
        postalCode: new FormControl(
          this.data.person.id ? this.data.person.address.postalCode : '',
          [Validators.required]),
        cityId: new FormControl(
          this.data.person.id ? this.data.person.address.city.id : '',
          Validators.required),
        stateId: new FormControl(
          this.data.person.id ? this.data.person.address.city.state.id : '',
          Validators.required)
      })
    });
    ObservableFrom(this.personForm.get('address.stateId').valueChanges).subscribe(
      async (id) => {
        if (id === undefined) {
          this.cities = [];
        } else {
          this.cities = await this.stateService.getAllCities(id);
        }
      }
    );
  }

  async register() {
    const person = this.personForm.getRawValue();
    person.id = this.data.person.id || null;
    if (typeof person.phones === 'string') {
      const phones = person.phones;
      person.phones = [];
      phones.split(',').forEach(value => person.phones.push(value.trim()));
    }
    person.address.id = this.data.person.address ? this.data.person.address.id || null : null;
    person.address.city = await this.cityService.get(person.address.cityId);
    delete person.address.cityId;
    delete person.address.stateId;
    this.dialogRef.close(person);
  }

  cancel() {
    this.dialogRef.close();
  }

}
