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
import { SubjectsOverviewPageComponent } from './pages/subjects-overview-page/subjects-overview-page.component';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectDialogComponent } from './components/subject-dialog/subject-dialog.component';

@NgModule({
  declarations: [SubjectsOverviewPageComponent, SubjectDialogComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
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
  entryComponents: [SubjectDialogComponent]
})
export class SubjectsModule { }
