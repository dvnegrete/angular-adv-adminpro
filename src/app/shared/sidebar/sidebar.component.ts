import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SiderbarService } from 'src/app/services/siderbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public user: Usuario;

  constructor(
    public sidebarService: SiderbarService,
    public userService: UserService
    ) {
    //this.imgUrl = userService.user.imageURL;
    this.user = userService.user
  }

}
