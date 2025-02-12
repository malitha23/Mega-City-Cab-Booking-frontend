import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signiup',
  templateUrl: './signiup.component.html',
  styleUrl: './signiup.component.css'
})

export class SignupComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  showOtpModal: boolean = false;
  otpEmail: string = '';
  otpExpirationTime: string = '';
  otp: string = ''; // Holds the OTP entered by the user
  isOtpVerified: boolean = false; // Tracks whether the OTP is verified
  successOtpMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const signUpData = { email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName };
    this.authService.signUp(signUpData).subscribe(
      (response) => {
        console.log(response);
        if (response.message && response.message.includes("An OTP sent to your organization email")) {
          this.otpEmail = response.email; // Set the email from the response
          this.otpExpirationTime = response.expirationTime; // Set the expiration time from the response
          this.showOtpModal = true; // Show OTP modal
        }
      },
      (error) => {
        console.error('Error during sign up:', error);
      }
    );
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
              this.router.navigate(['/signin']); // Navigate to the sign-in page
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
