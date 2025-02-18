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

  responseMessage: string = '';
  responseType: 'success' | 'error' | undefined = undefined;
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {

    if (!this.firstName) {
      form.controls.firstName.markAsTouched();
    }

    if (!this.lastName) {
      form.controls.lastName.markAsTouched();
    }

    if (!this.email) {
      form.controls.email.markAsTouched();
    }
    if (form.controls.email.invalid) {
      form.controls.email.markAsTouched();
    }
    if (!this.password) {
      form.controls.password.markAsTouched();
    }

    if (form.valid) {
    const signUpData = { email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName };
    this.authService.signUp(signUpData).subscribe(
      (response) => {
        this.authService.saveUserData(response);
        this.responseMessage = response.message;
        this.responseType = 'success';  // Adjust based on response
        setTimeout(() => {
          if (response.message && response.message.includes("An OTP sent to your organization email")) {
            this.otpEmail = response.email; // Set the email from the response
            this.otpExpirationTime = response.expirationTime; // Set the expiration time from the response
            this.showOtpModal = true; // Show OTP modal
          }
        }, 2000); 
      
        
      },
      (error) => {
        this.responseMessage = error.message || 'An error occurred';
        this.responseType = 'error';  // Adjust based on error
        setTimeout(() => {
          this.responseMessage = '';
          this.responseType = undefined;
        }, 3000); 
      }
    );
  } else {
    this.responseMessage = 'Please fill in all fields.';
    this.responseType = 'error';
    setTimeout(() => {
      this.responseMessage = '';
      this.responseType = undefined;
    }, 3000); 
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
            this.responseMessage = response.message;
            this.responseType = 'success';  // Adjust based on response
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000); 
          } else {
            // Handle other response statuses if needed
            console.error('OTP verification failed:', response);
            this.responseMessage = 'OTP verification failed';
            this.responseType = 'error';  // Adjust based on error
            setTimeout(() => {
              this.responseMessage = '';
              this.responseType = undefined;
            }, 3000); 
          }
        },
        (error) => {
          this.responseMessage = error.message || 'An error occurred';
          this.responseType = 'error';  // Adjust based on error
          setTimeout(() => {
            this.responseMessage = '';
            this.responseType = undefined;
          }, 3000); 
        }
      );
    }
  }

}
