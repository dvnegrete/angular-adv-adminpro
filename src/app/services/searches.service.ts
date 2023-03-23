import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators'

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

  search(
    type:'usuarios'|'medicos'|'hospitales',
    phrase: string
    ) {
    const url = `${baseURL}/search/collection/${type}/${phrase}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( ( res: any ) => {
          return res.resultados;
        })
      )
  }
  
  searchGlobal(phrase: string) {
    const url = `${baseURL}/search/all/${phrase}`
    return this.http.get(url, this.headers)
  }
  
}
