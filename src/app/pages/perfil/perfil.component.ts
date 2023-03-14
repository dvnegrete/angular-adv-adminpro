import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  public profileForm: FormGroup;
  public user: Usuario;
  public uploadImage: any;
  public showTempImage: any = null;

  constructor(  private fb: FormBuilder,
                private userService: UserService,
                private fileUploadService: FileUploadService
                ){
    this.user = userService.user;
    this.profileForm = this.fb.group({
      nombre: [ this.user.nombre, Validators.required ],
      email: [ this.user.email, [Validators.required, Validators.email] ]
    });    
  }
  
  ngOnInit(): void {
  }

  updateProfile() {
    //console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe( res => {
        const { nombre, email } = this.profileForm.value;
        this.user.nombre = nombre;
        this.user.email = email;
        Swal.fire({
          icon: 'success',
          text: "Información Actualizada",
          confirmButtonText: 'OK'
        })
      }, (err)=>{
        Swal.fire({
          icon: 'error',
          text: err.error.msg,
          confirmButtonText: 'OK'
        })
        console.log()
      });
  }

  changeImage(event: any){
    const file = event.target.files[0];
    this.uploadImage = file;
    if (!file) { 
      return this.showTempImage = null; 
    }
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = ()=> {
      this.showTempImage = reader.result
    }
    return true
  }

  updateImage(){
    console.log(this.uploadImage)
    this.fileUploadService.updatePhoto(this.uploadImage, 'usuarios', (this.user.uid || ''))
      .then( img => {
        this.user.img = img
        Swal.fire({
          icon: 'success',
          text: "Imagen Actualizada",
          confirmButtonText: 'OK'
        })
      }).catch( err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          text: 'Error al actualizar la imagen',
          confirmButtonText: 'OK'
        })
      })
  }
  
}