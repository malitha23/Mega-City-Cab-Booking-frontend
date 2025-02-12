import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Make sure to have the correct API URL
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {

    private apiUrl = `${environment.apiUrl}/api/categories`;
    private token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZ2htYWxpdGhAZ21haWwuY29tIiwiaWF0IjoxNzM5MzkwNTY2LCJleHAiOjE3Mzk0NzY5NjZ9.Ym1232kEs8m46BtkE1WH3mZCNPheaB3GqISbzImRyZo`; // Retrieve token from localStorage

    constructor(private http: HttpClient) {}

    // Get all categories
    getAllCategories(): Observable<Category[]> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,  // Add Bearer token to Authorization header
        });

        return this.http.get<Category[]>(this.apiUrl, { headers }).pipe(catchError(this.handleError));
    }

    // Get category by ID
    getCategoryById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
    }

    // Add a new category
    addCategory(category: Category): Observable<Category> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,  // Add Bearer token to Authorization header
        });

        return this.http.post<Category>(this.apiUrl, category, { headers }).pipe(
            catchError(this.handleError)
        );
    }
    // Update category name
    updateCategory(id: number, categoryName: string): Observable<Category> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,  // Add Bearer token to Authorization header
        });

        return this.http.put<Category>(`${this.apiUrl}/${id}`, { name: categoryName }, { headers }).pipe(catchError(this.handleError));
    }

    // Delete category
    deleteCategory(id: number): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,  // Add Bearer token to Authorization header
        });

        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
    }

    // Error handling
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
