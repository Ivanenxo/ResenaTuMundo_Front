import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferenciasComponent } from './referencias/referencias.component';
import { AgregarReferenciaComponent } from './agregar-referencia/agregar-referencia.component';
import { MisReferenciasComponent } from './mis-referencias/mis-referencias.component';
import { AuthGuard } from './service/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'referencias', component: ReferenciasComponent },
      { path: 'agregar', component: AgregarReferenciaComponent },
      { path: 'mis-referencias', component: MisReferenciasComponent },
      { path: 'register', component: RegisterComponent},
      { path: '', redirectTo: '/dashboard/referencias', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' } // Redirige cualquier otra ruta a /login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
