import { Component, OnDestroy, OnInit  } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers : number = 0;
  public users: Usuario[] = [];
  public usersTemp: Usuario[] = [];
  public since: number = 0;
  public charged: boolean = true;
  public imageSubs: Subscription = new Subscription;

  constructor( private userService: UserService,
              private searchesService: SearchesService,
              private modalImageService: ModalImageService
               ){
    this.loadingUsers();
  }

  ngOnInit(): void {
    this.imageSubs = this.modalImageService.changesImage
      .pipe( delay(100) )
      .subscribe( () => this.loadingUsers() )
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe()
  }
    
  loadingUsers(){
    this.charged = true
    this.userService.loadUser( this.since )
    .subscribe( ({ count, users }) => {
      this.totalUsers =  count;
      this.users = users;
      this.usersTemp = users;
      this.charged = false;
    })
  }

  changePage(value: number) {
    this.since += value;
    if (this.since < 0 ) {
      this.since = 0
    } else if (this.since > this.totalUsers) {
      this.since -= value;
    }
    this.loadingUsers();
  }

  search(phrase: string){
    if (phrase.length === 0 ) {
      this.users = this.usersTemp
    }
    this.searchesService.search('usuarios', phrase).subscribe(
      res => {
        this.users = res
      }
    )
  }

  deleteUser(user: Usuario) {
    
    if (user.uid === this.userService.uid) {
      return Swal.fire(
        'Error',
        'No es posible eliminar tu usuario',
        'error'
      )
    }
    Swal.fire({
      title: 'Borrar usuario',
      text: `Deseas eliminar a ${user.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar ahora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
        .subscribe(
          res => {
            this.loadingUsers()
            Swal.fire(
            'Eliminado.',
            `${user.nombre} eliminado correctamente.`,
            'success'
            )
          }
        );
      }
    })
    return;
  }

  changeRole(user: Usuario){    
    this.userService.saveProfile(user)
      .subscribe( res => console.log(res))
  }

  openModal(user: Usuario) {
    this.modalImageService.openModal('usuarios', user.uid, user.img)
  }

}
