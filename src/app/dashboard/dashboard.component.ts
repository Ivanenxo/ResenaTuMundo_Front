import { Component } from '@angular/core';
import { AuthService } from '../service/api.service';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  

  
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    // Agrega la lógica de cierre de sesión según tu implementación de AuthService
    this.authService.logout();
    
    // Redirige al componente de inicio de sesión después de cerrar sesión
    this.router.navigate(['/login']);
  }
}