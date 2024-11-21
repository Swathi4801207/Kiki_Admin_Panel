import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistancebasefareComponent } from './add-distancebasefare.component';

describe('AddDistancebasefareComponent', () => {
  let component: AddDistancebasefareComponent;
  let fixture: ComponentFixture<AddDistancebasefareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDistancebasefareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDistancebasefareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
