import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {
  isModalOpen = false;
  additionalTaxMessage: string = '';
  vehicleId: number | undefined;

  // Input property to receive data from parent
  @Input() itemData: any = {};
  @Input() isBookingInProgress: boolean = false;

  // Emit booking data to parent
  @Output() bookingSubmitted = new EventEmitter<any>();

  booking = {
    destination: '',
    pickUpLocation: '',
    bookingDate: '',
    price: 0,
    phone: '',
    address: '',
    nic: '',
    days: 0,
    totalPrice: 0,
    status: 0,
    vehicleId: this.itemData.id
  };

  comeResponse(){
    
  }

  // Show modal
  openModal() {
    console.log('Received itemData in Modal:', this.itemData);

    // Check if itemData is available before assigning vehicleId
    if (this.itemData && this.itemData.id) {
      this.vehicleId = this.itemData.id;
      this.booking.vehicleId = this.itemData.id; // Assign vehicleId to the booking object
    }

    // Set initial price if itemData exists
    if (this.itemData) {
      this.booking.price = parseFloat(this.itemData.price) || 0;
      this.calculateTotalPrice(); // Calculate total price based on default values
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
    if (!this.booking.phone || !this.booking.destination || !this.booking.nic || !this.booking.address || this.booking.days <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (this.booking.phone.length !== 10 || isNaN(parseInt(this.booking.phone))) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid 10-digit phone number.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    // Show loading alert
    Swal.fire({
      title: 'Booking...',
      text: 'Please wait while we process your booking.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.isBookingInProgress = true; // Disable the button

    this.bookingSubmitted.emit(this.booking);
  }


}
