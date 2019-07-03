import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { from as ObservableFrom } from 'rxjs';
import { Person } from '../../../core/shared/person.model';
import { ProfessorService } from '../../../core/shared/professor.service';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent implements OnInit {

  subjectForm: FormGroup;
  professors: Person[];

  constructor(
    private dialogRef: MatDialogRef<SubjectDialogComponent>,
    private professorService: ProfessorService
  ) { }

  ngOnInit() {
    this.subjectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      professor: new FormControl('', Validators.required)
    });

    ObservableFrom(this.professorService.getAll().then((data: Person[]) => data)).subscribe(
      (data: Person[]) => this.professors = data);
  }

  save() {
    const subject = this.subjectForm.getRawValue();
    this.professorService.get(subject.professor).then((professor: Person) => {
      subject.professor = professor;
      this.dialogRef.close(subject);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
