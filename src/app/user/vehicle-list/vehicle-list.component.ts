import { Component } from '@angular/core';
import { ItemService } from '../../services/ItemService';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  vehicles: [] = []; // To store the list of items
  vehicle: any; // To store a single item
  loading: boolean = false; // For loading state

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems(); // Load all items when the component is initialized
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
}
