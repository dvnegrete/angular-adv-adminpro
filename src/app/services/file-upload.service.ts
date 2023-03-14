import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor() { }

  async updatePhoto(file: File, 
                    type:'usuarios'|'medicos'|'hospitales',
                    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('imagen', file);
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem(('token')) || ''
        },
        body: formData
      })
      const data = await res.json();
      if(data.msg === "File Uploads"){
        return data.nameFile
      } else {
        console.log(data);
        return false
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
