import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }
  
  //@Input('valor') progress: number =  40;
  @Input('valorInput') progress: number =  40;
  @Input() btnClass: string = 'btn-primary';

  @Output('valorOutput') newValue: EventEmitter<number> = new EventEmitter();

  // get getPorcentaje() {
  //   return `${this.progress}%`
  // }

  cambiaValor ( valor: number) {
    if (this.progress >= 100 && valor >= 0) {
      this.newValue.emit(100)
      this.progress = 100;
    }
    else if (this.progress <= 0 && valor < 0) {
      this.newValue.emit(0)
      this.progress = 0;
    } else {
      this.progress = this.progress + valor
      this.newValue.emit(this.progress)
    }
  }

  onChanges(value: number) {
    if (value > 100) {
      this.progress = 100;
    } else if (value < 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.newValue.emit(this.progress);
  }
  
}
