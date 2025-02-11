import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrl: './signing.component.css'
})

export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signIn({ email: this.email, password: this.password }).subscribe(
      (response) => {
        // Handle the response, e.g., store the JWT token and navigate
        console.log(response);
      },
      (error) => {
        console.error('Error during sign in:', error);
      }
    );
  }
}
