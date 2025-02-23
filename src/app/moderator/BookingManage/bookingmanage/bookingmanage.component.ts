import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/BookingService'; // Make sure the path is correct
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { DriverService } from '../../../services/DriverService';

@Component({
  selector: 'app-bookingmanage',
  templateUrl: './bookingmanage.component.html',
  styleUrl: './bookingmanage.component.css'
})
export class BookingmanageComponent implements OnInit {
  bookings: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  pendingBookings: any[] = [];
  approvedBookings: any[] = [];
  rejectedBookings: any[] = [];
  selectedBooking: any;
  imageLoadurl: string = '';
  visibleselectedbookingModal: boolean= false;

  drivers: any[] = []; // Array to hold the driver list
  selectedDriver: any; // To store selected driver
  visibleDriverSelectionModal: boolean = false; // Flag to show driver selection modal


  constructor(private bookingService: BookingService, private driverService: DriverService,) { }

  ngOnInit(): void {
    // Fetch the bookings when the component is initialized
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;  // Assign the fetched data to the bookings array
        this.pendingBookings = data.filter((booking: any) => booking.status === 0);
        this.approvedBookings = data.filter((booking: any) => booking.status === 1);
        this.rejectedBookings = data.filter((booking: any) => booking.status === 2);
  
        console.log("Pending:", this.pendingBookings);
        console.log("Approved:", this.approvedBookings);
        console.log("Rejected:", this.rejectedBookings);
        this.loading = false;   // Set loading to false once data is loaded
      },
      error: (err) => {
        this.error = 'Error fetching bookings';
        this.loading = false;
      }
    });
  }

   openModalToShowBookingData(booking: any): void {
      this.selectedBooking = booking;  // Set the selected booking data
      this.imageLoadurl = environment.imageLoadurl;
    this.visibleselectedbookingModal = true;
     
    }
    
    deleteBooking(bookingId: number) {
      // Ask the user for confirmation before deleting the booking
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with deletion if confirmed
          this.bookingService.deleteBooking(bookingId).subscribe(
            (response) => {
              console.log(response);
              // Show success notification
              Swal.fire({
                title: 'Success!',
                text: 'Booking deleted successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then(() => {
                // Refresh the bookings list after deletion
                this.fetchBookings();
              });
            },
            (error) => {
              console.log(error);
              // Show error notification
              Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the booking.',
                icon: 'error',
                confirmButtonText: 'Try Again',
              });
            }
          );
        } else {
          // User canceled the deletion, show a cancellation message if needed
          Swal.fire({
            title: 'Cancelled',
            text: 'The booking was not deleted.',
            icon: 'info',
            confirmButtonText: 'OK',
          });
        }
      });
    }

      // Method to open the driver selection modal
  openDriverSelectionModal() {
    // Check if driver is already assigned
    if (this.selectedBooking?.driverId) {
      alert('Driver already assigned!');
      return;
    }

    // Fetch the list of drivers (you can replace this with an API call)
    this.getDrivers();

    // Show the driver selection modal
    this.visibleDriverSelectionModal = true;
  }

  // Example method to fetch the list of drivers (you should replace this with an actual API call)
  getDrivers() {
    this.driverService.getAllDrivers().subscribe(
      (data) => {
        this.drivers = data.filter(driver => 
          driver.enabled && 
          driver.isActivated && 
          driver.availabilityStatus === 'AVAILABLE' && 
          driver.vehicle === null
        );
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        this.loading = false;
      }
    );
  }

  selectDriver(driver: any) {
    this.selectedDriver = driver;
  }
  // Method to assign the selected driver to the booking
  assignDriver() {
    if (!this.selectedDriver) {
      alert('Please select a driver!');
      return;
    }

    // Call API to update the booking with the selected driver
    this.updateBookingWithDriver();

    // Close the modal
    this.visibleDriverSelectionModal = false;
  }

  // Example method to update the booking with the selected driver (you should replace with an actual API call)
  updateBookingWithDriver() {
    const driverData = {
      bookingId: this.selectedBooking.bookingId,
      driverId: this.selectedDriver.id,
      vehicleId: this.selectedBooking.vehicleId,
    };

    this.bookingService.updateBookingWithDriver(driverData).subscribe({
      next: (response) => {
        console.log('Booking updated with driver:', response);
        // Update your UI as needed (e.g., update selectedBooking, close modal, refresh list, etc.)
      },
      error: (error) => {
        console.error('Error updating booking with driver:', error);
        // Optionally, display an error message to the user.
      }
    });

    // Update the booking status (you can do this as per your needs)
    this.selectedBooking.driverId = this.selectedDriver;
    this.selectedBooking.status = 1; // Mark as "Approved"
  }
}