import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { NotFoundPagesComponent } from '../not-found-pages/not-found-pages.component';

@NgModule({
  declarations: [
    RegisterComponent,
    NotFoundPagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterComponent,
    NotFoundPagesComponent
  ]
})
export class AuthModule { }
