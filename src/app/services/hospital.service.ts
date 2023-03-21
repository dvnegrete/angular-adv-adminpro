import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { Hospital } from '../models/hospital.model';

const baseURL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  constructor(
    private http: HttpClient
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

  loadHospitales() {
    const url = `${baseURL}/hospitales`
    return this.http.get(url, this.headers)
      .pipe(
        map( ( res: any ) => res.hospital)
      );
  }

  createHospitales( nombre: string) {
    const url = `${baseURL}/hospitales`
    return this.http.post(url, { nombre }, this.headers)      
  }

  updateHospitales( id: string, name: string ) {
    const url = `${baseURL}/hospitales/${id}`
    const data = {
      nombre: name
    };
    return this.http.put(url, data, this.headers)      
  }

  deleteHospitales( id: string ) {
    const url = `${baseURL}/hospitales/${id}`;
    return this.http.delete(url, this.headers)      
  }
}
