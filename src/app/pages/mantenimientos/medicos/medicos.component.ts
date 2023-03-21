import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public charged: boolean = true;
  public medicos : Medico[] = [];
  public medicosTemp : Medico[] = [];
  public totalMedicos: number = 0;
  public imageSubs: Subscription = new Subscription;

  constructor(
        private medicosService: MedicoService,
        private modalImageService: ModalImageService,
        private searchesService: SearchesService
  ) {
    this.loadingMedicos();
  }
  ngOnDestroy(): void {
   this.imageSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.imageSubs = this.modalImageService.changesImage
      .pipe( delay(100))
      .subscribe( ()=> this.loadingMedicos())
  }

  loadingMedicos(){
    this.charged = true
    this.medicosService.loadMedicos()
    .subscribe( res => {
      this.totalMedicos =  res.length;
      this.medicos = res;
      this.medicosTemp = res;
      console.log(this.medicos)
      this.charged = false;
    })
  }

  changeImage(medico: Medico){    
    this.modalImageService.openModal('medicos', medico._id, medico.img);    
  }
  
  search(phrase: string){
    if (phrase.length === 0 ) {
      this.medicos = this.medicosTemp;
    } else{
      this.searchesService.search('medicos', phrase)    
      .subscribe( res=> {
        this.medicos = this.transformSearchMedicos(res)
      })
    }
  }
  private transformSearchMedicos (res: any[]): Medico[]{    
    return res.map(
      medico => new Medico(
        medico._id,
        medico.nombre,
        medico.img
      ))
  }

  deleteMedico(medico: Medico){
    this.medicosService.deleteMedico( medico )
      .subscribe( () => {
        Swal.fire({
          title: 'Eliminado.',
          text: `${medico.nombre} ha sido eliminado`,
          icon: 'success'
        })
        this.loadingMedicos();
      })
  }

}
