import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    ToolbarComponent
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
    MatIconModule
  ]
})
export class SharedModule { }
