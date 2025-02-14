import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLoginComponent } from './quick-login.component';

describe('QuickLoginComponent', () => {
  let component: QuickLoginComponent;
  let fixture: ComponentFixture<QuickLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
