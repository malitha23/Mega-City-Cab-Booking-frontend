import { Component } from '@angular/core';
import { UserService } from '../../services/UserService';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookingService } from '../../services/BookingService';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent {

  userData: any = {}; // Store user data
  loading: boolean = false;
  isEditing: boolean = false; // Track edit mode
  selectedFile: File | null = null;
  imageUploadbtn: boolean = false;

  pendingBookings: any[] = [];
  approvedBookings: any[] = [];
  rejectedBookings: any[] = [];
  bookingDataFetchLoader: boolean = true;
  selectedBooking: any;
  visibleselectedbookingModal: boolean= false;


  constructor(private userService: UserService, private authService: AuthService, private router: Router, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.loading = true;
    this.userService.getUserData().subscribe(
      (data: any) => {
        this.userData = data; // Assign response to userData
        this.loading = false;
        this.getUserBookings();
      },
      (error) => {
        console.error('Error fetching user data', error);
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch user data.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          this.authService.logout(); // Logout after user presses OK
        });

      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing; // Toggle edit mode
  }

  userDataUpdate(): void {
    this.userService.updateUserData(this.userData.firstName, this.userData.lastName, this.userData.email).subscribe(
      (response: any) => {
        console.log('User details updated successfully:', response);
        this.isEditing = false; // Exit edit mode
        this.getUserData();

        Swal.fire({
          title: 'Updated!',
          text: 'Your profile has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      },
      (error) => {
        console.error('Error updating user details:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update profile. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  confirmLogout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log out'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/signin']); // Redirect to login page
        });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.imageUploadbtn = true;
    }
  }

  uploadProfileImage(): void {
    if (!this.selectedFile) {
      Swal.fire('Error!', 'Please select an image to upload.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.userService.uploadProfileImage(formData).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire('Success!', 'Profile image updated successfully.', 'success');
        this.getUserData(); // Reload data to update image
        this.imageUploadbtn = false;
      },
      (error) => {
        Swal.fire('Error!', 'Failed to upload image.', 'error');
        this.imageUploadbtn = false;
      }
    );
  }

  getUserBookings(): void {
    this.bookingService.getUserBookings().subscribe(
      (data) => {
        console.log(data);
  
        this.pendingBookings = data.filter((booking: any) => booking.status === 0);
        this.approvedBookings = data.filter((booking: any) => booking.status === 1);
        this.rejectedBookings = data.filter((booking: any) => booking.status === 2);
  
        console.log("Pending:", this.pendingBookings);
        console.log("Approved:", this.approvedBookings);
        console.log("Rejected:", this.rejectedBookings);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModalToShowBookingData(booking: any): void {
    this.selectedBooking = booking;  // Set the selected booking data
  this.visibleselectedbookingModal = true;
   
  }
  
  
}
