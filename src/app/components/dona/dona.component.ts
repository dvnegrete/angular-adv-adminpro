import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})

export class DonaComponent implements OnChanges {
  
  @Input() title: string = "Sin Titulo";
  colors: string[] = ['#6857E6', '#009FEE', '#FFB414'];
  
  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];
  @Input('data') dataGrafic: number[] = [];
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.dataGrafic, 
        backgroundColor: this.colors
      },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets:[
        {
          data: this.dataGrafic,
          backgroundColor: this.colors
        }
      ]
    }

  }

  
}
