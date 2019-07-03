import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.headers = ['name', 'gender', 'phones', 'operations'];

    // Reset back to the first page, if the user changes the sort order.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.dataSource = new MatTableDataSource<Person>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.updateData().then();
  }

  async updateData(): Promise<any> {
    this.dataSource.data = await this.studentService.getAll();
  }

  showStudent(student?: Person) {
    this.dialog.open(PersonDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        subject: 'estudante',
        person: student || {}
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.createStudent(result);
      }
    });
  }

  showStudentInfo(student: Person) {
    this.dialog.open(PersonInfoComponent, {
      data: {
        specialization: 'estudante',
        person: student
      }
    });
  }

  createStudent(student: Person) {
    console.log(student);
    if (student.id) {
      this.studentService.put(student, student.id).then(() => {
          this.updateData().then();
          this.openSnackBar(`Estudante "${student.name}" foi atualizado com sucesso!`);
        }, () => this.openSnackBar(
        `Estudante "${student.name}" não foi atualizado...`)
      );
    } else {
      this.studentService.post(student).then(() => {
          this.updateData().then();
          this.openSnackBar(`Estudante "${student.name}" foi cadastrado com sucesso!`);
        }, () => this.openSnackBar(
        `Estudante "${student.name}" não foi cadastrado...`)
      );
    }
  }

  deleteStudent(student: Person) {
    this.studentService.delete(student.id).then(() => {
        this.updateData().then();
        this.openSnackBar(`Estudante "${student.name}" foi removido com sucesso!`);
      }, () => this.openSnackBar(
      `Estudante "${student.name}" possui dependências portanto não pode ser removido.`)
    );
  }

  confirmDelete(student: Person) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `Tem certeza que você deseja remover o estudante "${student.name}"?`,
        accept: () => this.deleteStudent(student),
        reject: () => null
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 6000});
  }

}
