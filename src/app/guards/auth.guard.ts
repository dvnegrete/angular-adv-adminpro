import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private userService: UserService,
    private router: Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const response = this.userService.validateToken()
            .pipe(
              tap( isAuth => {
                console.log("isAuth: ", isAuth)
                if (!isAuth) {
                  this.router.navigateByUrl('/login')
                }
              })
            )
      console.log("pasando por el guard can activate......")
    return response;
  }
  
}
