import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/ItemService';
import { AuthService } from '../../services/AuthService';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-booking-view-page',
  templateUrl: './booking-view-page.component.html',
  styleUrls: ['./booking-view-page.component.css'],
})
export class BookingViewPageComponent implements OnInit {
  item: any;
  loading: boolean = false;
  visible: boolean = false;  // Property to toggle visibility of the dialog
  username: string = '';  // Property to hold the username
  password: string = '';
  responseMessage: string = '';
  responseType: 'success' | 'error' | undefined = undefined;
  

  isRegistering: boolean = false;

  // Register Fields
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  registerPassword: string = '';

  showOtpModal: boolean = false;
  otpEmail: string = '';
  otpExpirationTime: any;
  otp: string = ''; // Holds the OTP entered by the user
  isOtpVerified: boolean = false; // Tracks whether the OTP is verified
  successOtpMessage: string = ''; 

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL and load the item
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadItemById(id);
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();  // Check from authentication service
}

  // Load an item by ID
  loadItemById(id: number): void {
    this.loading = true;
    this.itemService.getItemById(id).subscribe(
      (data) => {
        this.item = data; // Assign data to item
        this.loading = false; // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching item by ID', error);
        this.loading = false;
      }
    );
  }

  handleBookingClick() {
    console.log(this.isAuthenticated);
    if (!this.isAuthenticated) {
        this.toggleDialog();
    } else {
        // Proceed with the booking process
        console.log("Booking confirmed!");
    }
}

  toggleDialog() {
    this.visible = !this.visible;  // Toggle visibility of dialog
  }

    // Method to handle the emitted data from child component
    onLoginDataReceived(data: { username: string, password: string, firstname: string, lastname:string, email: string, registerPassword: string, isRegistering:boolean }) {
  if (!data.isRegistering) {
    this.authService.signIn({ email: data.username, password: data.password }).subscribe(
      (response) => {
        this.responseMessage = 'Login successful!';
        this.responseType = 'success';
        this.visible = false;  // Close the dialog on success
        console.log(response);
      },
      (error) => {
        this.responseMessage = 'Login failed. Please check your credentials.';
        this.responseType = 'error';
        console.error('Error during sign-in:', error);
      }
    );
  } else {
    this.authService.signUp({ firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.registerPassword }).subscribe(
      (response) => {

        this.responseMessage = 'Registration successful! You can now log in.';
        this.responseType = 'success';
        setTimeout(() => {
          this.visible = false; 
          if (response.message && response.message.includes("An OTP sent to your organization email")) {
            this.otpEmail = response.email; // Set the email from the response
            this.otpExpirationTime = this.datePipe.transform(response?.expirationTime, 'yyyy-MM-dd HH:mm:ss');
            this.showOtpModal = true; // Show OTP modal
          }
        }, 2000);
        
      },
      (error) => {
        this.responseMessage = error?.error?.message || 'Registration failed. Please try again.';
        this.responseType = 'error';
        console.error('Error during registration:', error);
      }
    );
  }
}

closeOtpModal() {
  this.showOtpModal = false; // Close the OTP modal
}

verifyOtp() {
  if (this.otp) {
    const otpRequest = {
      email: this.otpEmail,
      otp: this.otp
    };

    this.authService.validateOtp(otpRequest).subscribe(
      (response) => {
        console.log(response);
        if (response.message && response.message.includes("activated successfully")) {
          console.log('OTP verified successfully:', response);
          this.isOtpVerified = true; // Mark OTP as verified
          this.successOtpMessage = response.message; // Set the success message

          // After displaying the success message, navigate to the sign-in page after a delay
          setTimeout(() => {
            
          }, 2000); // Adjust the delay if needed
        } else {
          // Handle other response statuses if needed
          console.error('OTP verification failed:', response);
        }
      },
      (error) => {
        console.error('Error during OTP verification:', error);
      }
    );
  }
}

}
