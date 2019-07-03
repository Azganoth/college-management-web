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
  personGender = personGender;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private professorService: ProfessorService,
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
    ObservableFrom(this.professorService.getAll().then((data: Person[]) => data)).subscribe(
      (data: Person[]) => this.dataSource.data = data);
  }

  showDialog(professor?: Person) {
    this.dialog.open(PersonDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        specialization: 'professor',
        person: professor || {}
      }
    }).afterClosed().subscribe((result: Person) => {
      if (result) {
        this.save(result);
      }
    });
  }

  showInfo(professor: Person) {
    this.dialog.open(PersonInfoComponent, {
      data: {
        specialization: 'professor',
        person: professor
      }
    });
  }

  save(professor: Person) {
    if (professor.id) {
      this.professorService.put(professor, professor.id).then(() => {
          this.refresh();
          this.snackBar.open(`O professor ${professor.name} foi atualizado com sucesso!`);
        }, () => this.snackBar.open(`O professor ${professor.name} não foi atualizado...`)
      );
    } else {
      this.professorService.post(professor).then(() => {
          this.refresh();
          this.snackBar.open(`O professor ${professor.name} foi cadastrado com sucesso!`);
        }, () => this.snackBar.open(`O professor ${professor.name} não foi cadastrado...`)
      );
    }
  }

  delete(professor: Person) {
    this.professorService.delete(professor.id).then(() => {
        this.refresh();
        this.snackBar.open(`O professor ${professor.name} foi removido com sucesso!`);
      }, (data) => {
        console.error(data.error.message);
        this.snackBar.open(`O professor ${professor.name} não pode ser removido.`);
      }
    );
  }

  confirmDelete(professor: Person) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar exclusão',
        message: `Tem certeza que você deseja remover o professor ${professor.name}?`,
        accept: () => this.delete(professor),
        reject: () => null
      }
    });
  }

}
