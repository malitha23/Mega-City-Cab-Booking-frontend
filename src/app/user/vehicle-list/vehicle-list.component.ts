import { Component, Input } from '@angular/core';
import { ItemService } from '../../services/ItemService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {

  vehicle: any; // To store a single item
  loading: boolean = false; // For loading state

  @Input() vehicles: any[] = [];
  searchText: string = '';
  selectedVehicleType: string | null = null;
  selectedBrand: string | null = null;
  searching:boolean = false;


  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // Extract query parameters
      this.searchText = params['searchText'] || '';
      this.selectedVehicleType = params['vehicleType'] || null;
      this.selectedBrand = params['brand'] || null;

      // Check if all parameters are either set or null
      if (this.searchText || this.selectedVehicleType || this.selectedBrand) {
        this.loading = true;
        this.searching = true;
        // Only call loadItems if at least one filter is applied
        this.itemService
        .searchItems(this.searchText, this.selectedVehicleType, this.selectedBrand)
        .subscribe(
          (response) => {
            console.log(response);
            setTimeout(() => {  // Delay for 2 seconds before setting loading to false
              this.vehicles = response; // Assign data to items
              this.loading = false; // Hide the loader
            }, 2000);
          },
          (error) => {
            console.error('Error during search', error);
          }
        );
        
      }else{
        this.searching = false;
        this.loadItems();
      }
    });
  }

  // Load all items
  loadItems(): void {
    this.loading = true;
    this.itemService.getAllItems().subscribe(
      (data: any) => {
        console.log(data);
        setTimeout(() => {  // Delay for 2 seconds before setting loading to false
          this.vehicles = data; // Assign data to items
          this.loading = false; // Hide the loader
        }, 2000);
      },
      (error) => {
        console.error('Error fetching items', error);
        this.loading = false;
      }
    );
  }

  goBack(): void {
    window.history.back(); // Navigates back to the previous page
  }
  
}
