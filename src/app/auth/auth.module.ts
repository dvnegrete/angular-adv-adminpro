import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { NotFoundPagesComponent } from '../404not-found-pages/not-found-pages.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    NotFoundPagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  exports: [
    RegisterComponent,
    NotFoundPagesComponent
  ]
})
export class AuthModule { }
