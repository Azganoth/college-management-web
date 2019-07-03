import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsOverviewPageComponent } from './pages/students-overview-page/students-overview-page.component';

const professorsRoutes: Routes = [
  {path: '', component: StudentsOverviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(professorsRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
