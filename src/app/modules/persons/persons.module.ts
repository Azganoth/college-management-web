import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatSelectModule
} from '@angular/material';
import { PersonDialogComponent } from './components/person-dialog/person-dialog.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';

@NgModule({
  declarations: [PersonDialogComponent, PersonInfoComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule
  ],
  entryComponents: [PersonInfoComponent, PersonDialogComponent]
})
export class PersonsModule { }
