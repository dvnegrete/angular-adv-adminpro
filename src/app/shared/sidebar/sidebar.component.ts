import { Component } from '@angular/core';
import { SiderbarService } from 'src/app/services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menuItems: any[];

  constructor(public sidebarService: SiderbarService) {
    this.menuItems = sidebarService.menu;
  }

}
