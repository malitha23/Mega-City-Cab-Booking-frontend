import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/ItemService'; // Import the ItemService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrl: './list-vehicle.component.css'
})
export class ListVehicleComponent {

  items: any[] = []; // To store the list of items
  item: any; // To store a single item
  loading: boolean = false; // For loading state

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems(); // Load all items when the component is initialized
  }

  // Load all items
  loadItems(): void {
    this.loading = true;
    this.itemService.getAllItems().subscribe(
      (data) => {
        this.items = data; // Assign data to items
        this.loading = false; // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching items', error);
        this.loading = false;
      }
    );
  }

  // Load an item by ID
  loadItemById(id: number): void {
    this.loading = true;
    this.itemService.getItemById(id).subscribe(
      (data) => {
        this.item = data; // Assign data to item
        this.loading = false; // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching item by ID', error);
        this.loading = false;
      }
    );
  }

}
