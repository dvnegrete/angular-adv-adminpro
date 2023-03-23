import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SiderbarService } from '../services/siderbar.service';

declare function customInitialFunction(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService,
              private sidebarService: SiderbarService
    ) {

  }

  ngOnInit(): void {
    customInitialFunction();
    this.sidebarService.loadingMenu();
  }

}
