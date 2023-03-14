import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public user: Usuario;

  constructor(public userService: UserService) {    
    this.user = userService.user;
   }

  logout(){    
    this.userService.logout();
  }

}
