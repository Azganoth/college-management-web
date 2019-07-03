import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Person } from '../../../core/shared/person.model';
import { StudentService } from '../../../core/shared/student.service';
import { Subject } from '../../../core/shared/subject.model';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss']
})
export class EnrollmentDialogComponent implements OnInit {

  students: Person[];
  studentsForm: FormControl;

  constructor(
    private dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subject: Subject
    },
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.studentsForm = new FormControl('', Validators.required);
    this.studentService.getAll().then((students: Person[]) => this.students = students);
  }

  save() {
    this.dialogRef.close({subjectId: this.data.subject.id, studentId: this.studentsForm.value});
  }

  cancel() {
    this.dialogRef.close();
  }

}
