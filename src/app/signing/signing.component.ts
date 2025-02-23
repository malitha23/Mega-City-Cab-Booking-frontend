import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrl: './signing.component.css'
})

export class SigninComponent {
  email: string = '';
  password: string = '';

  responseMessage: string = '';
  responseType: 'success' | 'error' | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: any) {
    if (!this.email) {
      form.controls.email.markAsTouched();
    }

    if (!this.password) {
      form.controls.password.markAsTouched();
    }

    if (form.valid) {
      if (form.valid) {
        this.authService.signIn({ email: this.email, password: this.password }).subscribe(
          response => {
            this.authService.saveUserData(response);
            this.responseMessage = response.message;
            console.log(response);
            this.responseType = 'success';  // Adjust based on response
            // Role-based redirection
            const userRole = response.user.role;  // Ensure this correctly extracts the role
            let redirectUrl = '/userProfile'; // Default for ROLE_USER

            if (userRole === 'ROLE_ADMIN') {
              redirectUrl = '/admin/Dashboard';
            } else if (userRole === 'ROLE_MODERATOR') {
              redirectUrl = '/moderator/Dashboard';
            }

            setTimeout(() => {
              this.router.navigate([redirectUrl]);
            }, 2000);
          },
          error => {
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
  }
}
