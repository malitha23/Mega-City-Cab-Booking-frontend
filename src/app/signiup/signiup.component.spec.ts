import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigniupComponent } from './signiup.component';

describe('SigniupComponent', () => {
  let component: SigniupComponent;
  let fixture: ComponentFixture<SigniupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigniupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigniupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
