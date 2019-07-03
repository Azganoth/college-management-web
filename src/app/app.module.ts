import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { ProfessorsModule } from './modules/professors/professors.module';
import { StudentsModule } from './modules/students/students.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatPaginatorIntlCro } from './shared/custom/mat-paginator-intl-cro';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    Error404PageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ProfessorsModule,
    StudentsModule,
    SubjectsModule,
    EnrollmentsModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
