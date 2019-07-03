import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatChipsModule,
  MatFormFieldModule,
  MatIconModule, MatNativeDateModule,
  MatPaginatorModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { PersonsModule } from '../persons/persons.module';
import { ProfessorsOverviewPageComponent } from './pages/professors-overview-page/professors-overview-page.component';
import { ProfessorsRoutingModule } from './professors-routing.module';

@NgModule({
  declarations: [ProfessorsOverviewPageComponent],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    PersonsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatChipsModule
  ]
})
export class ProfessorsModule { }
