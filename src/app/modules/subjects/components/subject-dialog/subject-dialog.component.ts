import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
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
    this.initializeSubject().then();
  }

  async initializeSubject() {
    this.professors = await this.professorService.getAll();
    this.subjectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      professor: new FormControl('', Validators.required)
    });
  }

  async register() {
    const subject = this.subjectForm.getRawValue();
    subject.professor = await this.professorService.get(subject.professor);
    console.log(subject);
    this.dialogRef.close(subject);
  }

  cancel() {
    this.dialogRef.close();
  }

}
