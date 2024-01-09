import { Component } from '@angular/core';
import { AuthService } from '../service/api.service';
import { Router } from '@angular/router';
import { CommunicationService } from '../service/comunication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationUsername: string = '';
  registrationPassword: string = '';
  registrationEmail: string ='';

  constructor(
    public authService: AuthService,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.communicationService.registrationFormVisibility$.subscribe((visibility) => {
      this.authService.showRegistrationForm = visibility;
    });
  }

  register(): void {
    const newUser = {
      Nombre_Usuario: this.registrationUsername,
      Contrasena: this.registrationPassword,
      Correo: this.registrationEmail

      // Agregar otros campos según tus necesidades
    };

    this.authService.register(newUser).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente', response);
        // Redirigir a la página principal u otras acciones después del registro exitoso.
        if (response) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Error en el registro', error);
        // Manejar errores de registro, por ejemplo, mostrar un mensaje de error.
      }
    );
  }
}