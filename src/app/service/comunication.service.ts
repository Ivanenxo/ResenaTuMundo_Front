import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private registrationFormVisibilitySubject = new Subject<boolean>();
  registrationFormVisibility$ = this.registrationFormVisibilitySubject.asObservable();

  sendRegistrationFormVisibility(visibility: boolean): void {
    this.registrationFormVisibilitySubject.next(visibility);
  }
}