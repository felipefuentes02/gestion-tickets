import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudesCcPage } from './solicitudes-cc.page';

describe('SolicitudesCcPage', () => {
  let component: SolicitudesCcPage;
  let fixture: ComponentFixture<SolicitudesCcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesCcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
