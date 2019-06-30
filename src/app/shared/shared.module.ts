import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ConfirmationDialogComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class SharedModule { }
