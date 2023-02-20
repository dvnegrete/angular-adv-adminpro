import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-pages',
  templateUrl: './not-found-pages.component.html',
  styleUrls: [ './not-found-pages.component.css' ]
})
export class NotFoundPagesComponent {
  year = new Date().getFullYear();
}
