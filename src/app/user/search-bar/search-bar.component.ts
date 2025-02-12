import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchText: string = '';

  searchVehicle() {
    if (this.searchText) {
      console.log('Searching for:', this.searchText);
      // You can add the logic here to trigger a search or API call based on searchText
    } else {
      console.log('Please enter a search term');
    }
  }
}
