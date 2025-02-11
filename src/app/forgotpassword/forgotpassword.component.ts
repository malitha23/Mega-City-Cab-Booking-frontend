import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})

export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        console.log(response);
        // Show a success message
      },
      (error) => {
        console.error('Error during password reset request:', error);
      }
    );
  }
}
