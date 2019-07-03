import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subject } from '../../../core/shared/subject.model';
import { SubjectService } from '../../../core/shared/subject.service';
import { SubjectDialogComponent } from '../../components/subject-dialog/subject-dialog.component';

@Component({
  selector: 'app-subjects-overview-page',
  templateUrl: './subjects-overview-page.component.html',
  styleUrls: ['./subjects-overview-page.component.scss']
})
export class SubjectsOverviewPageComponent implements OnInit {

  headers: string[];
  dataSource: MatTableDataSource<Subject>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private subjectService: SubjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.headers = ['name', 'professor', 'description', 'operations'];

    // Reset back to the first page, if the user changes the sort order.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.dataSource = new MatTableDataSource<Subject>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.updateData().then();
  }

  async updateData(): Promise<any> {
    this.dataSource.data = await this.subjectService.getAll();
  }

  createSubjectDialog() {
    this.dialog.open(SubjectDialogComponent, {
      width: '500px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.createSubject(result);
      }
    });
  }

  getRoute(id: number): string {
    return `/subjects/${id}`;
  }

  createSubject(subject: Subject) {
    this.subjectService.post(subject).then(() => {
        this.updateData().then();
        this.openSnackBar(`Disciplina "${subject.name}" foi criada com sucesso!`);
      }, () => this.openSnackBar(
      `Disciplina "${subject.name}" não foi criada...`)
    );
  }

  deleteSubject(subject: Subject) {
    this.subjectService.delete(subject.id).then(() => {
        this.updateData().then();
        this.openSnackBar(`Disciplina "${subject.name}" foi removido com sucesso!`);
      }
    );
  }

  confirmDelete(subject: Subject) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `Tem certeza que você deseja remover a disciplina "${subject.name}"?`,
        accept: () => this.deleteSubject(subject),
        reject: () => null
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 6000});
  }

}
