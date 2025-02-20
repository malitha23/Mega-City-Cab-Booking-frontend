import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('tokenBooking');  // Returns true if a token exists
  }

  saveUserData(response: any): void {
    // Store the token and user details in localStorage
    localStorage.setItem('tokenBooking', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  // Get the user data from localStorage
  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get the stored token from localStorage
  getToken(): string | null {
    return localStorage.getItem('tokenBooking');
  }

  signIn(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  signUp(signUpData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, signUpData);
  }

  validateOtp(otpRequest: { otp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/otp/validate`, otpRequest);
  }

  resendOtp(otpRequest: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/otp/resend`, otpRequest);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(passwordData: { token: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, passwordData);
  }

  logout(): void {
    localStorage.removeItem('tokenBooking');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
}
