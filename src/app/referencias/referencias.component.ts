
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {
  resenas: any[] = [];
  filteredResenas: any[] = [];
  tituloLibroFilter = '';
  usuarioFilter = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.authService.getAllReseñas().subscribe(data => {
      const observables = data.map(reseña => this.authService.getUserById(reseña.id_Usuario));

      forkJoin(observables).subscribe(respuestas => {
        this.resenas = data.map((reseña, index) => {
          return {
            ...reseña,
            nombre_Usuario: respuestas[index].nombre_Usuario
          };
        });

        // Inicializamos filteredResenas con la lista completa al principio
        this.filteredResenas = [...this.resenas];
      }, error => {
        console.error('Error al obtener nombres de usuarios', error);
      });
    });
  }

  aplicarFiltros(): void {
    // Aplicamos los filtros a la lista completa de reseñas
    this.filteredResenas = this.resenas.filter(item =>
      item.titulo_Libro.toLowerCase().includes(this.tituloLibroFilter.toLowerCase()) &&
      item.nombre_Usuario.toLowerCase().includes(this.usuarioFilter.toLowerCase())
    );
  }


  limpiarFiltros(): void {
    // Limpiamos los filtros y aplicamos los cambios
    this.tituloLibroFilter = '';
    this.usuarioFilter = '';
    this.aplicarFiltros();
  }
}