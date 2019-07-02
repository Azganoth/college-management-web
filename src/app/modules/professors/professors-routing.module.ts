import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsOverviewPageComponent } from './pages/professors-overview-page/professors-overview-page.component';

const professorsRoutes: Routes = [
  {path: '', component: ProfessorsOverviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(professorsRoutes)],
  exports: [RouterModule]
})
export class ProfessorsRoutingModule { }
