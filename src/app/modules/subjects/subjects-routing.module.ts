import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsOverviewPageComponent } from './pages/subjects-overview-page/subjects-overview-page.component';

const professorsRoutes: Routes = [
  {path: '', component: SubjectsOverviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(professorsRoutes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
