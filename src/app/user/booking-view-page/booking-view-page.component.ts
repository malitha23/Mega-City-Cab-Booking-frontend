import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/ItemService';

@Component({
  selector: 'app-booking-view-page',
  templateUrl: './booking-view-page.component.html',
  styleUrls: ['./booking-view-page.component.css']
})
export class BookingViewPageComponent implements OnInit {
  item: any;
  loading: boolean = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL and load the item
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadItemById(id);
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
