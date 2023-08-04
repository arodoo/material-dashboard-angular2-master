import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsRecordComponent } from './clients-record.component';

describe('ClientsRecordComponent', () => {
  let component: ClientsRecordComponent;
  let fixture: ComponentFixture<ClientsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
