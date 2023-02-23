import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  
  public labels1: string[] = [ 'Pan', 'Refresco', 'Tortillas'];
  public data1:  number[] = [ 110, 150, 350 ]
  public labels2: string[] = [ 'R. Humanos', 'R. Financieros', 'R. Materiales'];
  public data2:  number[] = [ 8, 3, 2 ]
  public labels3: string[] = [ 'PCs', 'Laptops', 'Servidores'];
  public data3:  number[] = [ 149, 50, 3 ]


}
  