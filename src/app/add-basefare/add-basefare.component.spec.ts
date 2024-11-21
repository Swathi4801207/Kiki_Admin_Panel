import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasefareComponent } from './add-basefare.component';

describe('AddBasefareComponent', () => {
  let component: AddBasefareComponent;
  let fixture: ComponentFixture<AddBasefareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBasefareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBasefareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
