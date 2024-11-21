import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancebasefareComponent } from './distancebasefare.component';

describe('DistancebasefareComponent', () => {
  let component: DistancebasefareComponent;
  let fixture: ComponentFixture<DistancebasefareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistancebasefareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancebasefareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
