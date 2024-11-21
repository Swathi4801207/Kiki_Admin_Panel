import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideTypesComponent } from './ride-types.component';

describe('RideTypesComponent', () => {
  let component: RideTypesComponent;
  let fixture: ComponentFixture<RideTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
