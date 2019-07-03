import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsOverviewPageComponent } from './pages/enrollments-overview-page/enrollments-overview-page.component';

const enrollmentsRoutes: Routes = [
  {path: '', component: EnrollmentsOverviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(enrollmentsRoutes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
