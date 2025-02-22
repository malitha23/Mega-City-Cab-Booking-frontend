import { Component, EventEmitter, Output  } from '@angular/core';
import { CategoryService } from '../../services/CategoryService';
import { SubCategoryService } from '../../services/subcategoryServise';
import Swal from 'sweetalert2';
import { ItemService } from '../../services/ItemService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  selectedVehicleType: string = '';
  selectedBrand: string = '';
  searchText: string = '';
  categories: any = [];
  subCategories: any = [];

  @Output() searchCompleted = new EventEmitter<any>(); 

    constructor(private router: Router, private categoryService: CategoryService, private subCategoryService: SubCategoryService, private itemService: ItemService) { }
  
    ngOnInit(): void {
      this.loadCategories();
    }
  
    // Load all categories
    loadCategories(): void {
      this.categoryService.getAllCategories().subscribe(
        (categories) => {
          console.log(categories);
          this.categories = categories;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    onVehicleTypeChange(): void {
      if (this.selectedVehicleType) {
        this.getVehiclesByCategoryId(parseInt(this.selectedVehicleType));  // Call the API with the selected vehicle type ID
      }
    }
  
    getVehiclesByCategoryId(categoryId: number): void {
      this.subCategoryService.getSubCategoriesByCategoryId(categoryId).subscribe(
        (subCategories) => {
          console.log('Subcategories:', subCategories);
          this.subCategories = subCategories;  // Bind subcategories to display
        },
        (error) => {
          console.log('Error fetching subcategories:', error);
        }
      );
    }

    searchVehicle(): void {
      // Check if at least one of the selected filters is not null or empty
      if (this.selectedVehicleType || this.selectedBrand || this.searchText) {
        console.log('Searching for:', this.selectedVehicleType, this.selectedBrand, this.searchText);
        this.router.navigate(['/listing'], {
          queryParams: {
            searchText: this.searchText,
            vehicleType: this.selectedVehicleType,
            brand: this.selectedBrand,
          },
        });
        // this.itemService
        // .searchItems(this.searchText, this.selectedVehicleType, this.selectedBrand)
        // .subscribe(
        //   (response) => {
        //     console.log(response);
        //     this.searchCompleted.emit(response);
        //   },
        //   (error) => {
        //     console.error('Error during search', error);
        //   }
        // );
        
        // Call your service to search the vehicles based on the selected criteria
        // For example: this.vehicleService.searchVehicles(this.selectedVehicleType, this.selectedBrand, this.searchText);
      } else {
        // If no filter is selected, display an alert or message
        console.log('Please select a filter or enter search text');
        Swal.fire({
          title: 'Error!',
          text: 'Please select a filter or enter search text to proceed.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
    
}
