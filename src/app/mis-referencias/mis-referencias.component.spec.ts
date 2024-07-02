import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReferenciasComponent } from './mis-referencias.component';

describe('MisReferenciasComponent', () => {
  let component: MisReferenciasComponent;
  let fixture: ComponentFixture<MisReferenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisReferenciasComponent]
    });
    fixture = TestBed.createComponent(MisReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
