import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../../services/subcategoryServise';
import { SubCategory } from '../..//models/subcategory.model';

@Component({
  selector: 'app-manage-subcategory',
  templateUrl: './manage-subcategory.component.html',
  styleUrl: './manage-subcategory.component.css'
})
export class ManageSubcategoryComponent implements OnInit{

  subCategories: SubCategory[] = [];
  newSubCategory: SubCategory = { name: '', category: { id: 1 } };

  constructor(private subCategoryService: SubCategoryService) {}

  ngOnInit(): void {
    this.getAllSubCategories();
  }

  // Get all subcategories
  getAllSubCategories(): void {
    this.subCategoryService.getAllSubCategories().subscribe((data) => {
      this.subCategories = data;
    });
  }

  // Add a new subcategory
  addSubCategory(): void {
    this.subCategoryService.addSubCategory(this.newSubCategory).subscribe((data) => {
      this.subCategories.push(data);
      this.newSubCategory = { name: '', category: { id: 1 } };  // Reset form
    });
  }

  // Delete a subcategory
  deleteSubCategory(id: any): void {
    this.subCategoryService.deleteSubCategory(id).subscribe(() => {
      this.subCategories = this.subCategories.filter(subCategory => subCategory.id !== id);
    });
  }
}
