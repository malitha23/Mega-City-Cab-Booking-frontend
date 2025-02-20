import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL
import { SubCategory } from '../models/subcategory.model';

@Injectable({
    providedIn: 'root',
})
export class SubCategoryService {

    private apiUrl = `${environment.apiUrl}/api/subcategories`;
    private token = localStorage.getItem('tokenBooking'); // Retrieve token from localStorage

    constructor(private http: HttpClient) { }

    // Get all subcategories
    getAllSubCategories(): Observable<SubCategory[]> {
        const headers = this.getHeaders();
        return this.http.get<SubCategory[]>(this.apiUrl, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Get a single subcategory by ID
    getSubCategoryById(id: number): Observable<SubCategory> {
        const headers = this.getHeaders();
        return this.http.get<SubCategory>(`${this.apiUrl}/${id}`, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Get subcategories by category ID
    getSubCategoriesByCategoryId(categoryId: number): Observable<SubCategory[]> {
        const headers = this.getHeaders();
        return this.http.get<SubCategory[]>(`${this.apiUrl}/category/${categoryId}`, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Add a new subcategory
    addSubCategory(subCategory: SubCategory): Observable<SubCategory> {
        const headers = this.getHeaders();
        return this.http.post<SubCategory>(this.apiUrl, subCategory, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Update an existing subcategory
    updateSubCategory(id: number, subCategory: SubCategory): Observable<SubCategory> {
        const headers = this.getHeaders();
        return this.http.put<SubCategory>(`${this.apiUrl}/${id}`, subCategory, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Delete a subcategory by ID
    deleteSubCategory(id: number): Observable<void> {
        const headers = this.getHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Get authorization headers (with Bearer token)
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
        });
    }

    // Handle errors
    private handleError(error: any) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
