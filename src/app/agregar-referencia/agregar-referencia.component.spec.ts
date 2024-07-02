import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReferenciaComponent } from './agregar-referencia.component';

describe('AgregarReferenciaComponent', () => {
  let component: AgregarReferenciaComponent;
  let fixture: ComponentFixture<AgregarReferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarReferenciaComponent]
    });
    fixture = TestBed.createComponent(AgregarReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
