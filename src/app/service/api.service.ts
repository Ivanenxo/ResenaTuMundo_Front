import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommunicationService } from '../service/comunication.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7268/api/User';
  private apiUrlR= 'https://localhost:7268/api/ReseñaLibro';
  showRegistrationForm: boolean = false;

  constructor(private http: HttpClient,private communicationService: CommunicationService) {}


  




  agregarReferencia(referencia: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrlR, referencia, { headers }).pipe(
      tap(response => console.log('Referencia agregada con éxito:', response)),
      catchError(this.handleError('agregarReferencia', []))
    );
  }
//token
obtenerIdUsuario(): number | null {
  // Asumiendo que almacenas la información del usuario en el token
  const token = localStorage.getItem('token');

  if (token) {
    // Decodifica el token (implementación depende del formato del token)
    const tokenPayload = this.decodeToken(token);

    console.log('Token payload:', tokenPayload);

    // Extrae el ID de usuario del token (ajusta según el formato del token)
    const idUsuario = tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];


    if (idUsuario) {
      return idUsuario; // Convierte a número, si es necesario
    }
  }

  // Devuelve null si no se puede obtener el ID del usuario
  return null;
}

private decodeToken(token: string): any {
  // Implementa la lógica para decodificar el token
  // Esto puede variar según el formato del token (JWT, etc.)
  // Utiliza una biblioteca de decodificación de tokens o tu lógica personalizada
  // Aquí se proporciona un ejemplo muy simple solo con fines ilustrativos
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = atob(payloadBase64);
    return JSON.parse(payloadDecoded);
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return null;
  }
}
//fin token



register(user: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post('https://localhost:7268/api/User', user, { headers }).pipe(
    tap(response => console.log('Registro exitoso:', response)),
    catchError(this.handleError('register', []))
  );
}



  login(username: string, password: string): Observable<any> {
    const body = { Nombre_Usuario: username, Contrasena: password, correo: "1" };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth`, body, { headers }).pipe(
      tap(response => this.handleLoginSuccess(response)),
      catchError(this.handleError('login', []))
    );
  }


  getAllReseñas(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7268/api/ReseñaLibro');
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    
    // Utilizamos el operador tap para realizar acciones secundarias (en este caso, el console.log)
    return this.http.get(url).pipe(
      tap(data => console.log('Información del usuario:', data))
    );
  }

  logout(): void {
    // Elimina el token del localStorage u otras acciones de cierre de sesión
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Verifica si hay un token en el localStorage u otras lógicas de autenticación
    return !!localStorage.getItem('token');
  }

  // Otros métodos relacionados con la autenticación, como verificar el estado, podrían ir aquí.
  toggleRegistrationForm(value: boolean): void {
    this.showRegistrationForm = value;
    console.log('showRegistrationForm:', this.showRegistrationForm);
  }


  private handleLoginSuccess(response: any): void {
    // Manejar la respuesta exitosa del inicio de sesión aquí
    // Guardar el token u otros datos relevantes en el localStorage
    localStorage.setItem('token', response.token);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Puedes enviar el error a través del sistema de registro o mostrar un mensaje al usuario
      // Aquí simplemente devolvemos un resultado vacío.
      return of(result as T);
    };
  }
}