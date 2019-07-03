import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { SubjectsModule } from '../subjects/subjects.module';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsOverviewPageComponent } from './pages/enrollments-overview-page/enrollments-overview-page.component';

@NgModule({
  declarations: [EnrollmentsOverviewPageComponent, EnrollmentDialogComponent],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SubjectsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [EnrollmentDialogComponent]
})
export class EnrollmentsModule { }
