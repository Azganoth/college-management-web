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
import { ProfessorService } from '../../../core/shared/professor.service';
import { PersonDialogComponent } from '../../../persons/components/person-dialog/person-dialog.component';
import { PersonInfoComponent } from '../../../persons/components/person-info/person-info.component';

@Component({
  selector: 'app-professors-overview-page',
  templateUrl: './professors-overview-page.component.html',
  styleUrls: ['./professors-overview-page.component.scss']
})
export class ProfessorsOverviewPageComponent implements OnInit {

  headers: string[];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private professorService: ProfessorService,
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
    this.dataSource.data = await this.professorService.getAll();
  }

  showProfessor(professor?: Person) {
    this.dialog.open(PersonDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        subject: 'professor',
        person: professor || {}
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.createProfessor(result);
      }
    });
  }

  showProfessorInfo(professor: Person) {
    this.dialog.open(PersonInfoComponent, {
      data: {
        specialization: 'professor',
        person: professor
      }
    });
  }

  createProfessor(professor: Person) {
    console.log(professor);
    if (professor.id) {
      this.professorService.put(professor, professor.id).then(() => {
          this.updateData().then();
          this.openSnackBar(`Professor "${professor.name}" foi atualizado com sucesso!`);
        }, () => this.openSnackBar(
        `Professor "${professor.name}" não foi atualizado...`)
      );
    } else {
      this.professorService.post(professor).then(() => {
          this.updateData().then();
          this.openSnackBar(`Professor "${professor.name}" foi cadastrado com sucesso!`);
        }, () => this.openSnackBar(
        `Professor "${professor.name}" não foi cadastrado...`)
      );
    }
  }

  deleteProfessor(professor: Person) {
    this.professorService.delete(professor.id).then(() => {
      this.updateData().then();
      this.openSnackBar(`Professor "${professor.name}" foi removido com sucesso!`);
    }, () => this.openSnackBar(
        `Professor "${professor.name}" possui dependências portanto não pode ser removido.`)
    );
  }

  confirmDelete(professor: Person) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `Tem certeza que você deseja remover o professor "${professor.name}"?`,
        accept: () => this.deleteProfessor(professor),
        reject: () => null
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {duration: 6000});
  }

}
