import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit {

  public users: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  
  constructor( private activatedRoute: ActivatedRoute,
              private searchService: SearchesService
     ){
    
    }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( ({ phrase }) =>  this.searchGlobal(phrase) )
  }

  searchGlobal( phrase: string) {
    this.searchService.searchGlobal(phrase)
    .pipe ( delay(100) )
    .subscribe( (res: any) =>{
      console.log(res)
      this.users = res.usuarios;
      this.medicos = res.medicos
      this.hospitales = res.hospitales
    })
  }

}
