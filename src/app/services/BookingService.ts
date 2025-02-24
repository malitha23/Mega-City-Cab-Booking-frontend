import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiUrl = `${environment.apiUrl}/api/bookings`;
    private token = localStorage.getItem('tokenBooking');// Retrieve token from localStorage


    constructor(private http: HttpClient) { }

    getAllBookings(): Observable<any[]> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
        });

        return this.http.get<any[]>(`${this.apiUrl}`, { headers });
    }

    updateBookingWithDriver(driverData: any): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
        });

        // Use PUT or POST depending on your backend design. Here we use PUT.
        return this.http.put(`${this.apiUrl}/assign-driver`, driverData, { headers });
      }

    createBooking(bookingData: any): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
        });

        return this.http.post<any>(`${this.apiUrl}/create`, bookingData, { headers });
    }

    getUserBookings(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
        });

        return this.http.get<any>(`${this.apiUrl}/user`, { headers });
    }

    deleteBooking(bookingId: number): Observable<any> {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
        });
    
        return this.http.delete<any>(`${this.apiUrl}/delete/${bookingId}`, { headers });
      }
}
