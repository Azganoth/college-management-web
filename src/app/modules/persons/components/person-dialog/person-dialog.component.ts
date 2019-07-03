import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { from as ObservableFrom } from 'rxjs';
import { City } from '../../../core/shared/city.model';
import { CityService } from '../../../core/shared/city.service';
import { personGender } from '../../../core/shared/person.gender';
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
  step = 0;
  personForm: FormGroup;
  personGender = personGender;
  personGenders = Object.keys(this.personGender);
  today = new Date(Date.now());
  cities: City[];
  states: State[];

  constructor(
    private dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      specialization: string,
      person: Person
    },
    private cityService: CityService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    const hasData = this.data.person.id;
    this.title = hasData
      ? `Modificando o ${this.data.specialization} com id [${this.data.person.id}]`
      : `Cadastrando um novo ${this.data.specialization}`;

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
        street: new FormControl(hasData ? this.data.person.address.street : '',
          Validators.required),
        number: new FormControl(
          hasData ? this.data.person.address.number || '' : ''),
        numberAptRoom: new FormControl(
          hasData ? this.data.person.address.numberAptRoom || '' : ''),
        complement: new FormControl(
          hasData ? this.data.person.address.complement || '' : ''),
        neighborhood: new FormControl(
          hasData ? this.data.person.address.neighborhood || '' : ''),
        postalCode: new FormControl(
          hasData ? this.data.person.address.postalCode : '',
          [Validators.required]),
        cityId: new FormControl(
          hasData ? this.data.person.address.city.id : '',
          Validators.required),
        stateId: new FormControl(
          hasData ? this.data.person.address.city.state.id : '',
          Validators.required)
      })
    });

    ObservableFrom(this.personForm.get('address.stateId').valueChanges).subscribe(
      (id: number) => {
        if (id === undefined) {
          this.cities = [];
        } else {
          this.stateService.getAllCities(id).then((cities: City[]) => this.cities = cities);
        }
      }
    );

    this.stateService.getAll().then((states: State[]) => this.states = states);
    if (hasData) {
      this.personForm.get('address.stateId').setValue(this.data.person.address.city.state.id);
    }
  }

  save() {
    this.nextStep();
    const person = this.personForm.getRawValue();
    person.id = this.data.person.id || null;
    if (typeof person.phones === 'string' && person.phones.length > 0) {
      const phones = person.phones;
      person.phones = [];
      phones.split(',').forEach((value: string) => person.phones.push(value.trim()));
    }
    person.address.id = this.data.person.address ? this.data.person.address.id || null : null;
    this.cityService.get(person.address.cityId).then((city: City) => {
      delete person.address.cityId;
      delete person.address.stateId;
      person.address.city = city;
      this.dialogRef.close(person);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  prevStep() {
    this.step--;
  }

  nextStep() {
    this.step++;
  }

}
