import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

public titleComponent!: string;
public titleSubs$: Subscription;
  
  constructor(private router: Router) {
    this.titleSubs$ = this.getDataRoute().subscribe( ({ title }) => {
      console.log( title)
      this.titleComponent = title;
      document.title = `AdminPro - ${ title }`
    })
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter<any>(  (event)=> event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
