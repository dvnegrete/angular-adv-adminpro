import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from './../guards/auth.guard'

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { SearchesComponent } from './searches/searches.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    //canActivate: [ AuthGuard ] Recibe un Boolean que indica si puede o mostrarse todas estas rutas
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta' } },
      { path: 'buscar/:phrase', component: SearchesComponent, data: { title: 'Busquedas' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'promesas', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },

      //Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales de Aplicación' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos de Aplicación' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Medicos de Aplicación' } },

      //Rutas para Admin
      { path: 'usuarios', canActivate: [ AdminGuard ], component: UsersComponent, data: { title: 'Usuarios de Aplicación' } },
    ],    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
