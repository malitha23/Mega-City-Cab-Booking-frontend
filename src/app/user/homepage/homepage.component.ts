import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  vehicles: any[] = [];

  // This method will handle the emitted event from search component
  onSearchCompleted(results: any[]): void {
    this.vehicles = results;
    console.log('Search Results:', this.vehicles);
  }

}
