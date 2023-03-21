import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { Medico } from '../models/medico.model';

const baseURL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

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

  loadMedicos(){
    const url = `${baseURL}/medico`
    return this.http.get(url, this.headers)
      .pipe(
        map( ( res: any ) => res.msg )
      );
  }
    
  getMedicoById( id: string ) {
    const url = `${baseURL}/medico/${id}`
    return this.http.get(url, this.headers)
      .pipe(
        map( ( res: any ) => res.msg )
      );

  }

  createMedico( medico: { nombre: string, hospital: string } ) {
    const url = `${baseURL}/medico`
    return this.http.post(url, medico, this.headers)    
  }

  updateMedico( medico: Medico ) {
    const url = `${baseURL}/medico/${medico._id}`;
    return this.http.put(url, medico, this.headers)
  }

  deleteMedico(medico: Medico) {
    const url = `${baseURL}/medico/${medico._id}`;
    return this.http.delete(url, this.headers)
  }
}
