import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Enrollment } from '../../../core/shared/enrollment.model';
import { Subject } from '../../../core/shared/subject.model';
import { SubjectService } from '../../../core/shared/subject.service';
import { EnrollmentDialogComponent } from '../../components/enrollment-dialog/enrollment-dialog.component';

@Component({
  selector: 'app-enrollments-overview-page',
  templateUrl: './enrollments-overview-page.component.html',
  styleUrls: ['./enrollments-overview-page.component.scss']
})
export class EnrollmentsOverviewPageComponent implements OnInit {

  headers: string[];
  dataSource: MatTableDataSource<Enrollment>;
  subject: Subject;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.headers = ['student', 'grades', 'average', 'averageStatus', 'operations'];

    // Reset back to the first page, if the user changes the sort order.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.dataSource = new MatTableDataSource<Enrollment>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.updateData().then();
  }

  async updateData(): Promise<any> {
    this.subject = await this.subjectService.get(this.route.snapshot.params.id);
    this.dataSource.data = await this.subjectService.getAllEnrollments(this.subject.id);
  }

  // i dont have a fuckin clue why the fuck those grade are duplicating when converted to json
  getGrades(grades: number[]): number[] {
    return [...new Set(grades)];
  }

  getAverage(grades: number[]): string {
    let sum = 0;
    for (const grade of grades) {
      sum += grade;
    }
    return (sum / 3).toFixed(2);
  }

  getAverageStatus(average: string): string {
    const averageNumber = Number(average);
    return averageNumber >= 7 ? 'Aprovado' : averageNumber > 2 ? 'Recuperação' : 'Reprovado';
  }

  createEnrollmentDialog() {
    this.dialog.open(EnrollmentDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        subject: this.subject
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        for (const studentId of result.studentsIds) {
          this.createEnrollment(result.subjectId, studentId);
        }
      }
    });
  }

  createEnrollment(subjectId: number, studentId: number) {
    this.subjectService.postEnrollment(subjectId, studentId).then(() => {
        this.updateData().then();
        this.openSnackBar(`Matrícula foi criada com sucesso!`);
      }, () => this.openSnackBar(
      `Matrícula não foi criada...`)
    );
  }

  deleteEnrollment(enrollment: Enrollment) {
    this.subjectService.deleteEnrollment(this.subject.id, enrollment.student.id).then(() => {
        this.updateData().then();
        this.openSnackBar(`Matrícula entre "${enrollment.subject.name}" e ${enrollment.student.name} foi removida com sucesso!`);
      }
    );
  }

  confirmDelete(enrollment: Enrollment) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `Tem certeza que você deseja remover a matrícula entre "${enrollment.subject.name}" e "${enrollment.student.name}"?`,
        accept: () => this.deleteEnrollment(enrollment),
        reject: () => null
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 6000});
  }

}
