import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( 
    private userService: UserService,
    private router: Router ){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const response = this.userService.validateToken()
          .pipe(
            tap( isAuth => {
              console.log("isAuth: ", isAuth)
              if (!isAuth) {
                this.router.navigateByUrl('/login')
              }
            })
          )
    return response;
  }

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
    return response;
  }
  
}
