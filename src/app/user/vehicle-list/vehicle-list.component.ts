import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  vehicles = [
    { imageUrl: 'https://example.com/car1.jpg', name: 'Tesla Model S', model: '2023', price: 120 },
    { imageUrl: 'https://example.com/car2.jpg', name: 'Ford Mustang', model: '2022', price: 100 },
    { imageUrl: 'https://example.com/car3.jpg', name: 'BMW M4', model: '2021', price: 150 }
  ];
}
