import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule, MatNativeDateModule,
  MatPaginatorModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { PersonsModule } from '../persons/persons.module';
import { StudentsOverviewPageComponent } from './pages/students-overview-page/students-overview-page.component';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [StudentsOverviewPageComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    PersonsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule
  ]
})
export class StudentsModule { }
