import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {
  isModalOpen = false;
  booking = { 
    phone: '', 
    destination: '', 
    days: 0, 
    price: 0, 
    totalPrice: 0,
    nic: '',  // Added NIC field
    address: '' // Added Address field
  };
  additionalTaxMessage: string = '';

  // Input property to receive data from parent
  @Input() itemData: any = {};

  // Emit booking data to parent
  @Output() bookingSubmitted = new EventEmitter<any>();

  // Show modal
  openModal() {
    console.log('Received itemData in Modal:', this.itemData);

    // Set initial price
    if (this.itemData) {
      this.booking.price = parseFloat(this.itemData.price) || 0;
      this.calculateTotalPrice();  // Calculate total price based on default values
    }

    this.isModalOpen = true;
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Handle changes in days and recalculate total price
  onDaysChange() {
    this.calculateTotalPrice();
  }

  getbaseprice(): number {
    const basePrice = parseFloat(this.itemData.price) || 0.0;
    const defaultTaxRate = parseFloat(this.itemData.defaultTaxRate) || 0.0;
    return basePrice + (basePrice / 100) * defaultTaxRate;
  }

  // Calculate the total price based on the number of days
  calculateTotalPrice() {
    const { price, defaultTaxRate, additionalTaxRate, defaultTaxDays } = this.itemData;
    const basePrice = parseFloat(price) || 0.0;
    const defaultTax = parseFloat(defaultTaxRate) || 0.0;
    const additionalTax = parseFloat(additionalTaxRate) || 0.0;
    const defaultTaxDay = parseInt(defaultTaxDays) || 0;

    let totalPrice = 0.0;

    // Apply default tax if days <= defaultTaxDays
    if (this.booking.days <= defaultTaxDay) {
      totalPrice = basePrice + ((basePrice / 100) * defaultTax); // Only the default tax is applied
      this.additionalTaxMessage = '';
    } else {
      const moreDaysCount = this.booking.days - defaultTaxDay;
      const perDayTax = (basePrice / 100) * additionalTax;
      const moreDaysTaxPrice = perDayTax * moreDaysCount;
      totalPrice = (basePrice + ((basePrice / 100) * defaultTax)) + moreDaysTaxPrice;

      // Set the additional tax message correctly
      this.additionalTaxMessage = `After ${defaultTaxDay} days, an additional tax of Rs ${(basePrice / 100) * additionalTax} per day will apply.`;
    }

    // Round the total price to 2 decimal points
    this.booking.totalPrice = Math.round(totalPrice * 100) / 100;
  }


submitBooking() {
  // Check if required fields are filled
  if (!this.booking.phone || !this.booking.destination || !this.booking.nic || !this.booking.address || this.booking.days <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Please fill in all required fields.',
      confirmButtonText: 'Ok'
    });
    return;
  }

  // Check if phone number length is exactly 10 digits
  if (this.booking.phone.length !== 10 || isNaN(parseInt(this.booking.phone))) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Phone Number',
      text: 'Please enter a valid 10-digit phone number.',
      confirmButtonText: 'Ok'
    });
    return;
  }

  // Emit booking data to the parent component
  this.bookingSubmitted.emit(this.booking);

  // Close modal after submission
  this.closeModal();
}

}
