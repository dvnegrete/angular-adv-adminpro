import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {   

    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next: value => console.log('Subs:', value), 
    //   error: err => console.warn('Error', err),
    //   complete: () => console.info('Obs terminado')
    // });

    this.intervalSubs = this.returnInterval().subscribe({
      next: value => console.log(value)
    })

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval():Observable<number> {
    const interval$ = interval(100).pipe(      
      //take(10),
      map( value => value + 1),
      filter( value => (value % 2 === 0) ? true : false),
    )
    return interval$;
  }

  returnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>( observer => {
      const intervalo = setInterval( ()=> {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete()
        }

        if (i===2) {
          observer.error('Aqui en 2 es error....')
        }

      }, 1000)
    });
  }


}
