import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasefaresComponent } from './basefares.component';

describe('BasefaresComponent', () => {
  let component: BasefaresComponent;
  let fixture: ComponentFixture<BasefaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasefaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasefaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
