import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/users`;
  private token = localStorage.getItem('tokenBooking');// Retrieve token from localStorage


  constructor(private http: HttpClient) { }

  // Method to get items created by the logged-in user
  getUserData(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
    });

    return this.http.get<any[]>(`${this.apiUrl}/getUserData`, { headers });
  }

  updateUserData(firstName: string, lastName: string, email: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const params = new URLSearchParams();
    params.append('firstName', firstName);
    params.append('lastName', lastName);
    params.append('email', email);

    return this.http.put(`${this.apiUrl}/updateDetails?${params.toString()}`, {}, { headers, responseType: 'text' });
  }

  uploadProfileImage(formData: FormData): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put(`${this.apiUrl}/uploadImage`, formData, { headers, responseType: 'text' });
  }



}