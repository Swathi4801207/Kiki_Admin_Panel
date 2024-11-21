import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCancelReasonsComponent } from './add-cancel-reasons.component';

describe('AddCancelReasonsComponent', () => {
  let component: AddCancelReasonsComponent;
  let fixture: ComponentFixture<AddCancelReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCancelReasonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCancelReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
