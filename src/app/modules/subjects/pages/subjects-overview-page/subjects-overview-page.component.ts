import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { from as ObservableFrom } from 'rxjs';
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headers = ['name', 'professor', 'operations'];

    // Reset back to the first page, if the user changes the sort order.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.dataSource = new MatTableDataSource<Subject>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.refresh();
  }

  refresh() {
    ObservableFrom(this.subjectService.getAll().then((data: Subject[]) => data)).subscribe(
      (data: Subject[]) => this.dataSource.data = data);
  }

  showDialog() {
    this.dialog.open(SubjectDialogComponent, {
      width: '600px',
      disableClose: true
    }).afterClosed().subscribe((result: Subject) => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(subject: Subject) {
    this.subjectService.post(subject).then(() => {
        this.refresh();
        this.snackBar.open(`A disciplina ${subject.name} foi criada com sucesso!`);
      }, () => this.snackBar.open(`A disciplina ${subject.name} não foi criada...`)
    );
  }

  delete(subject: Subject) {
    this.subjectService.delete(subject.id).then(() => {
        this.refresh();
        this.snackBar.open(`A disciplina ${subject.name} foi removido com sucesso!`);
      }
    );
  }

  confirmDelete(subject: Subject) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar exclusão',
        message: `Tem certeza que você deseja remover a disciplina ${subject.name}?`,
        accept: () => this.delete(subject),
        reject: () => null
      }
    });
  }

}
