import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.scss']
})
export class Error404PageComponent implements OnInit {

  shortMsg = 'Oops! A página solicitada não foi encontrada.';
  longMsg = 'A URL pode ter sido digitada incorretamente ou a página que você procura não está mais disponível.';

  constructor() { }

  ngOnInit() {
  }

}
