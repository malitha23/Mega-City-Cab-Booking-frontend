import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/CategoryService';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory: Category | null = null;
  newCategoryName: string = '';
  errorMessage: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load all categories
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  // Add a new category
  addCategory(): void {
    const newCategory: Category = {
      id: 0,
      name: this.newCategoryName,
    };
    this.categoryService.addCategory(newCategory).subscribe(
      (category) => {
        this.categories.push(category);
        this.newCategoryName = ''; // Reset the input field
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  // Update category name
  updateCategory(id: number, name: string): void {
    this.categoryService.updateCategory(id, name).subscribe(
      (category) => {
        const index = this.categories.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          this.categories[index] = category;
        }
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  // Delete a category
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter((category) => category.id !== id);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
