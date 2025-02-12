import { Component } from '@angular/core';
import { ItemService } from '../../services/ItemService';

@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.component.html',
  styleUrl: './add-new-vehicle.component.css'
})
export class AddNewVehicleComponent {

  file: File | null = null;

  constructor(private itemService: ItemService) { }

  // Handle form submit
  onSubmit() {
    if (this.file) {
      const formData = new FormData();

      // JSON data to be sent
      const jsonData = {
        "description": "A great item",
        "name": "Item 1",
        "isBooked": false,
        "mileage": "10000",
        "fuelType": "Gasoline",
        "price": "25000",
        "transmission": "Manual",
        "seatingCapacity": "5",
        "luggageCapacity": "500L",
        "color": "Red",
        "yearOfManufacture": "2020",
        "fuelEfficiency": "20 km/l",
        "deposit": "5000",
        "status": "Available",
        "licensePlate": "ABC1234",
        "tags": [
          { "name": "Tag1" },
          { "name": "Tag2" }
        ],
        "subCategory": { "id": 1 },
        "category": { "id": 1 }
      };

      // Append the JSON data and the file to FormData
      formData.append('data', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
      formData.append('file', this.file); // File selected by the user

      // Call the service to upload file and send data
      this.itemService.addNewVehicle(formData).subscribe(
        (response) => {
          console.log('Success:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Please select a file.');
    }
  }

  // Handle file input change
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]; // Get the selected file
    }
  }
}
