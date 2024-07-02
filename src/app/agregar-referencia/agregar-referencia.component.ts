import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/api.service';

@Component({
  selector: 'app-agregar-referencia',
  templateUrl: './agregar-referencia.component.html',
  styleUrls: ['./agregar-referencia.component.css']
})
export class AgregarReferenciaComponent  {

  tituloLibro: string = '';
  resena: string = '';
  calificacion: number = 1; // Inicializamos a 1 por defecto, puedes cambiar según tus necesidades

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  agregarReferencia(): void {
    if (this.tituloLibro && this.resena && this.calificacion) {
      const idUsuario = this.authService.obtenerIdUsuario();
      
      const nuevaReseña = {
        Id_Usuario: idUsuario,
        Titulo_Libro: this.tituloLibro,
        Resena: this.resena,
        Calificacion: this.calificacion.toString() // Convertir a cadena
      };
  
      this.authService.agregarReferencia(nuevaReseña).subscribe(
        response => {
          console.log('Reseña agregada exitosamente', response);
          alert("Reseña publicada con éxito");

          this.tituloLibro = '';
          this.resena = '';
          this.calificacion = 1;
          // Puedes realizar acciones adicionales después de agregar la reseña
        },
        error => {
          console.error('Error al agregar reseña', error);
          // Manejar errores de manera adecuada
        }
      );
    } else {
      console.error('Por favor, complete todos los campos antes de enviar la reseña.');
    }
  }
  
}