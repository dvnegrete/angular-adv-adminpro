import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales : Hospital[] = [];
  public selectedMedico: Medico = { _id: "", nombre: "", img: ""};
  public selectedHospital: Hospital = new Hospital( "", "", "");
  
  constructor(  private fb: FormBuilder,
                private hospitalService: HospitalService,
                private medicoService: MedicoService,
                private router: Router,
                private activatedRoute: ActivatedRoute
    ) {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })
    
    this.medicoForm.get('hospital')?.valueChanges.subscribe ( idHospital => {
      const exists = this.hospitales.find( hosp => hosp._id === idHospital)
      if (exists) {
        this.selectedHospital = exists;
      }
      console.log(this.selectedHospital)
    })    
  }
  
  ngOnInit(): void {
    this.loadHospitals();
    //activatedRoute.params me trae el parametro que trae la url
    this.activatedRoute.params.subscribe( ({ id }) =>      
      this.loadMedico(id)
    )
  }

  loadHospitals(){
    this.hospitalService.loadHospitales()
      .subscribe( (hospitales: Hospital[]) => {        
        this.hospitales = hospitales;
    })
  }

  saveMedico(){
    const { nombre } = this.medicoForm.value
    if (this.selectedMedico._id !== '') {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.selectedMedico._id
      }
      this.medicoService.updateMedico(data).subscribe( res=> {
        Swal.fire({
          title: 'Actualizado.',
          text: `${ nombre } ha sido actualizado correctamente`,
          icon: 'success'
        })
        console.log(res)
      })
      
    } else {
      //crear
      this.medicoService.createMedico(this.medicoForm.value).subscribe( (res: any) =>  {
        console.log(res)
        Swal.fire({
          title: 'Creado.',
          text: `${ nombre } ha sido creado correctamente`,
          icon: 'success'
        })
        this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`)
      }
      )
    }
  }

  loadMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.getMedicoById(id)
      .pipe( delay(100))
      .subscribe( medico => {
        console.log(medico)
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medico`);        
        }
        const { nombre, hospital: { _id } } = medico
        this.selectedMedico = medico
        this.medicoForm.setValue({ nombre:nombre, hospital: _id})
        return;      
      })
  }

}