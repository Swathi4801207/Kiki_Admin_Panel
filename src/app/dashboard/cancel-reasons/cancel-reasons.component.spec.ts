import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReasonsComponent } from './cancel-reasons.component';

describe('CancelReasonsComponent', () => {
  let component: CancelReasonsComponent;
  let fixture: ComponentFixture<CancelReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelReasonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
