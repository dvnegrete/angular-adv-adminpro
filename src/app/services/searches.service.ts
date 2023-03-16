import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';

const baseURL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformUsers (res: any[]): Usuario[] {    
    return res.map(
      user => new Usuario( 
        user.nombre, 
        user.email, 
        '', 
        user.img, 
        user.role, 
        user.google, 
        user.uid
      ))    
  }

  search(
    type:'usuarios'|'medicos'|'hospitales',
    phrase: string
    ) {
    const url = `${baseURL}/search/collection/${type}/${phrase}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( ( res: any ) => {
          switch (type) {
            case 'usuarios':
              return this.transformUsers(res.resultados)
              break;
              
              default:
              return this.transformUsers(res)
              break;
          }
        })
      )
  }
}
