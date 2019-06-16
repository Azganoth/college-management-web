import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  repoLink = AppConfig.repositoryURL;

  constructor() { }

  ngOnInit() {
  }

}
