import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivermanageComponent } from './drivermanage.component';

describe('DrivermanageComponent', () => {
  let component: DrivermanageComponent;
  let fixture: ComponentFixture<DrivermanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrivermanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrivermanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
