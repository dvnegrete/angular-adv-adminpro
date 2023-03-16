import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent {

  public uploadImage: any;
  public showTempImage: any = null;
  
  constructor( 
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
    ) {

  }

  closeModal(){
    this.modalImageService.closeModal();
    this.showTempImage = null;
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
    const id = this.modalImageService.id || '';
    const type = this.modalImageService.type;
    this.fileUploadService.updatePhoto(this.uploadImage, type, id)
      .then( img => {        
        Swal.fire({
          icon: 'success',
          text: "Imagen Actualizada",
          confirmButtonText: 'OK'
        })
        this.closeModal();
        this.modalImageService.changesImage.emit(img)
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
