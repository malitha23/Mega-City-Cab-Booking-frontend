import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = `${environment.apiUrl}/api/drivers`;  // Base URL for Driver API
  private token = localStorage.getItem('tokenBooking');  // Retrieve token from localStorage

  constructor(private http: HttpClient) { }

  // Method to get all drivers
  getAllDrivers(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`  // Bearer token from localStorage
    });

    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  // Method to get a driver by ID
  getDriverById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Method to create a new driver
  createDriver(driverData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<any>(`${this.apiUrl}/add`, driverData, { headers });
  }

  // Method to update an existing driver
  updateDriver(id: number, driverData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.put<any>(`${this.apiUrl}/update/${id}`, driverData, { headers });
  }

  // Method to delete a driver by ID
  deleteDriver(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers });
  }

}
