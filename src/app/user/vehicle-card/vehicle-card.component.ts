import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {
  @Input() vehicle!: {
[x: string]: any; 
    imageUrl: string;
    name: string;
    model: string;
    price: number;
  };

  getFinalPrice(vehicle: any): number {
    return Math.round(parseInt(vehicle.price) + (parseInt(vehicle.price) / 100) * vehicle['defaultTaxRate']);
  }
  
}
