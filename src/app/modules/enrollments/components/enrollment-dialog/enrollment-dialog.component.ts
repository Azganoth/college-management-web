import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Enrollment } from '../../../core/shared/enrollment.model';
import { Person } from '../../../core/shared/person.model';
import { StudentService } from '../../../core/shared/student.service';
import { Subject } from '../../../core/shared/subject.model';
import { SubjectService } from '../../../core/shared/subject.service';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss']
})
export class EnrollmentDialogComponent implements OnInit {

  students: Person[];
  studentsForm: FormControl;
  enrollments: Enrollment[];

  constructor(
    private dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subject: Subject
    },
    private studentService: StudentService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.initializeSubject().then();
  }

  async initializeSubject() {
    this.students = await this.studentService.getAll();
    this.enrollments = await this.subjectService.getAllEnrollments(this.data.subject.id);
    const studentsIds = [];
    for (const enrollment of this.enrollments) {
      studentsIds.push(enrollment.student.id);
    }
    this.studentsForm = new FormControl(studentsIds);
  }

  async register() {
    this.dialogRef.close({subjectId: this.data.subject.id, studentsIds: this.studentsForm.value});
  }

  cancel() {
    this.dialogRef.close();
  }

}
