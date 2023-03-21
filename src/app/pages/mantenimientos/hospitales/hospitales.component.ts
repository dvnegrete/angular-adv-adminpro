import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})

export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public loaded: boolean = true;
  public imageSubs: Subscription = new Subscription;
  
  constructor( 
              private hospitalService: HospitalService,
              private modalImageService: ModalImageService,
              private searchesService: SearchesService,
  ){  }
  
  ngOnInit(): void {
    this.loadedHospitales();
    this.imageSubs = this.modalImageService.changesImage
      .pipe( delay(100) )
      .subscribe( () => this.loadedHospitales() )
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe()
  }   
  
  loadedHospitales(){
    this.hospitalService.loadHospitales()    
    .subscribe( hospitales => {
      this.loaded = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    })
  }

  saveChanges(hospital: Hospital){
    this.hospitalService.updateHospitales(hospital._id, hospital.nombre)
      .subscribe( () => {
        Swal.fire({
          title: 'Actualizado',
          text: hospital.nombre,
          icon: 'success'
        })
      })
  }

  deleteHospital(hospital: Hospital){
    this.hospitalService.deleteHospitales(hospital._id)
      .subscribe( () => {
        Swal.fire({
          title: 'Eliminado.',
          text: `${hospital.nombre} ha sido eliminado`,
          icon: 'success'
        })
        this.loadedHospitales();
      })
  }

  async openModalSW(){
    let { value = ''  } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Crear Hospital:',
      inputPlaceholder: 'Nombre',
      showCancelButton: true
    })
    //value = value === undefined ? '': value;
    if (value.length > 0) {
      this.hospitalService.createHospitales(value)
        .subscribe( ()=>{
          this.loadedHospitales()
        })
    }
  }

  changeImage(hospital: Hospital){    
    this.modalImageService.openModal('hospitales', hospital._id, hospital.img);    
  }

  
  search(phrase: string){
    if (phrase.length === 0 ) {
      this.hospitales = this.hospitalesTemp;
    } else{
      this.searchesService.search('hospitales', phrase)    
      .subscribe( res=> this.hospitales = this.transformSearchHospitales(res) )
    }
  }

  private transformSearchHospitales (res: any[]): Hospital[]{
    return res.map(
      hospital => new Hospital(
        hospital.nombre, 
        hospital.img, 
        hospital._id
      ))      
  }
}
