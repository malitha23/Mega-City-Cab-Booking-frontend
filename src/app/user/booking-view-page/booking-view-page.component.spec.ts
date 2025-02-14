import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingViewPageComponent } from './booking-view-page.component';

describe('BookingViewPageComponent', () => {
  let component: BookingViewPageComponent;
  let fixture: ComponentFixture<BookingViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
