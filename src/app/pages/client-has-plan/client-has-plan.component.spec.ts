import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHasPlanComponent } from './client-has-plan.component';

describe('ClientHasPlanComponent', () => {
  let component: ClientHasPlanComponent;
  let fixture: ComponentFixture<ClientHasPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHasPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientHasPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
