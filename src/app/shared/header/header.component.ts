import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public userService: UserService,
              private router: Router        
    ) {    
    this.user = userService.user;
   }

  logout(){    
    this.userService.logout();
  }

  search(phrase: string) {
    if (phrase.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${ phrase }`)
  }

}
