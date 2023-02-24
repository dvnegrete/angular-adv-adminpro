import { Component, OnInit } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {
  
  ngOnInit(): void {
    this.getUsuarios()
    // const promesa = new Promise( (res, rej)=>{
    //   res("HOla Promise");
    // });

    // promesa.then( (mensaje)=>{
    //   console.log("termine", mensaje)
    // })
    // console.log("Fin de Init")    
  }

  getUsuarios(){
    fetch('https://reqres.in/api/users')
      .then( res => res.json())
      .then( body => console.log(body.data))
      
  }

}
