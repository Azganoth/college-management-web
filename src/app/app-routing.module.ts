import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './config/routes.config';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  {path: routesNames.home, component: HomePageComponent},
  {path: routesNames.error404, component: Error404PageComponent},

  {path: '**', redirectTo: RoutesConfig.routes.error404}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
