import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

//Modulos
import { PagesRoutingModule } from '../pages/pages-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';

import { NotFoundPagesComponent } from '../404not-found-pages/not-found-pages.component';

const routes: Routes = [
  //path: "dashboard" PagesRouting
  //path: "auth" AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundPagesComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {  }
