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
import { personGender } from '../../../core/shared/person.gender';
import { Person } from '../../../core/shared/person.model';
import { StudentService } from '../../../core/shared/student.service';
import { PersonDialogComponent } from '../../../persons/components/person-dialog/person-dialog.component';
import { PersonInfoComponent } from '../../../persons/components/person-info/person-info.component';

@Component({
  selector: 'app-students-overview-page',
  templateUrl: './students-overview-page.component.html',
  styleUrls: ['./students-overview-page.component.scss']
})
export class StudentsOverviewPageComponent implements OnInit {

  headers: string[];
  dataSource: MatTableDataSource<Person>;
  personGender = personGender;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.headers = ['name', 'gender', 'phones', 'operations'];

    // Reset back to the first page, if the user changes the sort order.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.dataSource = new MatTableDataSource<Person>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.refresh();
  }

  refresh() {
    ObservableFrom(this.studentService.getAll().then((data: Person[]) => data)).subscribe(
      (data: Person[]) => this.dataSource.data = data);
  }

  showDialog(student?: Person) {
    this.dialog.open(PersonDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        specialization: 'estudante',
        person: student || {}
      }
    }).afterClosed().subscribe((result: Person) => {
      if (result) {
        this.save(result);
      }
    });
  }

  showInfo(student: Person) {
    this.dialog.open(PersonInfoComponent, {
      width: '500px',
      data: {
        specialization: 'estudante',
        person: student
      }
    });
  }

  save(student: Person) {
    if (student.id) {
      this.studentService.put(student, student.id).then(() => {
          this.refresh();
          this.snackBar.open(`O estudante ${student.name} foi atualizado com sucesso!`);
        }, () => this.snackBar.open(`O estudante ${student.name} não foi atualizado...`)
      );
    } else {
      this.studentService.post(student).then(() => {
          this.refresh();
          this.snackBar.open(`O estudante ${student.name} foi cadastrado com sucesso!`);
        }, () => this.snackBar.open(`O estudante ${student.name} não foi cadastrado...`)
      );
    }
  }

  delete(student: Person) {
    this.studentService.delete(student.id).then(() => {
        this.refresh();
        this.snackBar.open(`O estudante ${student.name} foi removido com sucesso!`);
      }, (data) => {
        console.error(data.error.message);
        this.snackBar.open(`O estudante ${student.name} não pode ser removido.`);
      }
    );
  }

  confirmDelete(student: Person) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar exclusão',
        message: `Tem certeza que você deseja remover o estudante ${student.name}?`,
        accept: () => this.delete(student),
        reject: () => null
      }
    });
  }

}
