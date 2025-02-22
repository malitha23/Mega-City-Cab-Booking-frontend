import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL


@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = `${environment.apiUrl}/api/items`; // Base URL for all API requests
  private token = localStorage.getItem('tokenBooking');// Retrieve token from localStorage

  constructor(private http: HttpClient) {}

  // Method to get all items
  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  searchItems(name: string | null, category: string | null, subcategory: string | null): Observable<any> {
    let params = new HttpParams();
    if (name) {
      params = params.append('name', name);
    }
    if (category) {
      params = params.append('category', category);
    }
    if (subcategory) {
      params = params.append('subcategory', subcategory);
    }

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  // Method to get an item by ID
  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Method to get items by subcategory ID
  getItemsBySubcategoryId(subcategoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategory/${subcategoryId}`);
  }

  // Method to get items by category ID
  getItemsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  // Method to add a new item with file upload
  addNewVehicle(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
    });

    return this.http.post<any>(`${this.apiUrl}/add`, formData, { headers });
  }

  // Method to update an existing item with file upload
  updateItem(id: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
    });

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData, { headers });
  }

  // Method to delete an item
  deleteItem(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Method to get items created by the logged-in user
  getUserItems(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Bearer token from localStorage
    });

    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers });
  }

  // Method to update item name and description (and some additional fields)
  updateItemNameAndDescription(
    id: number,
    updates: {
      name?: string;
      description?: string;
      mileage?: string;
      fuelType?: string;
      price?: string;
      transmission?: string;
      seatingCapacity?: string;
      luggageCapacity?: string;
      color?: string;
      yearOfManufacture?: string;
      engineCapacity?: string;
      fuelEfficiency?: string;
      deposit?: string;
      status?: string;
      licensePlate?: string;
    }
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Bearer token from localStorage
    });

    return this.http.put<any>(`${this.apiUrl}/${id}/namedesc`, updates, { headers });
  }
}
