import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { NotFoundPagesComponent } from '../404not-found-pages/not-found-pages.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    NotFoundPagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RegisterComponent,
    NotFoundPagesComponent
  ]
})
export class AuthModule { }
