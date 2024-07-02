import { Component } from '@angular/core';
import { AuthService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Autenticación exitosa', response);
        // Redirigir a la página principal u otras acciones después del inicio de sesión exitoso.
        if (response) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Error en la autenticación', error);
        // Manejar errores de autenticación, por ejemplo, mostrar un mensaje de error.
      }
    );
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
}