import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'

import { LoadUsersInterface } from '../interfaces/load-users.interface';
import { LoginInterface } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { Usuario } from './../models/usuario.model';

declare const google: any;

const baseURL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  //private user: Usuario;
  public user = new Usuario('','');
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    ) {
      //this.googleInit();

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  validateToken(): Observable<boolean> {    
    return this.http.get(`${baseURL}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res: any)=> {
        const { nombre, email, role, google, img = '', uid, } = res.user;
        this.user = new Usuario(
          nombre,
          email,
          '',
          img,
          role, 
          google,
          uid, 
        );
        localStorage.setItem('token', res.token);
        return true
      }
      ),      
      // of crea un Observable en base al valor que le pasemos como paremetro 
      catchError( err => of(false))
    )
  }

  createUser( formData: RegisterForm) {
     return this.http.post(`${baseURL}/user`, formData)
            .pipe(
              tap( (res: any) => {
                localStorage.setItem('token', res.token)
              })
            )
  }

  updateProfile( data: { email:string, nombre: string, role: string }){
    const newData = {
      ...data,
      role: this.user.role
    }
    
    return this.http.put(`${baseURL}/user/${ this.uid }`, newData, this.headers)
  }

  login( formData: LoginInterface) {
    return this.http.post(`${baseURL}/login`, formData)
          .pipe(
            tap( (res: any) => {
              localStorage.setItem('token', res.token)
            })
          )
  }

  loginGoogle(token: string){
    return this.http.post(`${baseURL}/login/google`, { token : token })
          .pipe(
            tap( (resp: any )=>{
              console.log(resp)
                localStorage.setItem('token', resp.token)
            })
          )
  }

  // googleInit() {
  //     return new Promise( resolve =>{
  //     google.load('auth2', ()=> {
  //       this.auth2 = google.auth2.init({
  //         client_id: '632717658270-sm4kpeth4eq9e0ob68h1fk2f8l849srr.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //       });
  //       resolve();
  //     });
  //   })
  // }

  logout() {
    localStorage.removeItem('token');
    //Para eliminar el inicio de sesión en google
    google.accounts.id.revoke('dvnegrete@gmail.com', ()=>{
      this.ngZone.run( ()=>{
        this.router.navigateByUrl('/login')
      })
    })
    // this.auth2.signOut().then( ()=>{
    //   this.router.navigateByUrl('/login')
    // })
    
  }

  loadUser(since: number = 0) {
    const url = `${baseURL}/user?since=${since}`
    return this.http.get<LoadUsersInterface>(url, this.headers)
      .pipe(
        map( res => {
          const users = res.users.map( user => 
            new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid))
            return { 
              users: users,
              count : res.count
            }
        })
      )
  }

  deleteUser(user: Usuario) {    
    const url = `${baseURL}/user/${user.uid}`
    return this.http.delete(url, this.headers);    
  }

  saveProfile( user: Usuario){    
    return this.http.put(`${baseURL}/user/${ user.uid }`, user, this.headers)
  }
}