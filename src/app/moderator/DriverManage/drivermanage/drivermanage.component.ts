import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../services/DriverService'; // Import the DriverService
import { Router } from '@angular/router'; // Import Router to navigate after actions


@Component({
  selector: 'app-drivermanage',
  templateUrl: './drivermanage.component.html',
  styleUrl: './drivermanage.component.css'
})
export class DrivermanageComponent implements OnInit {

  drivers: any[] = [];  // To hold the list of drivers
  driverForm: any = {}; // To hold driver data for creating/updating
  selectedDriver: any;  // To hold the selected driver for update
  loading: boolean = false; // To show loading indicator

  constructor(private driverService: DriverService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDrivers();  // Fetch the list of all drivers when component initializes
  }

  // Method to get all drivers
  getAllDrivers(): void {
    this.loading = true;
    this.driverService.getAllDrivers().subscribe(
      (data) => {
        this.drivers = data;  // Store the drivers data
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        this.loading = false;
      }
    );
  }

  // Method to get driver details by ID
  getDriverDetails(id: number): void {
    this.driverService.getDriverById(id).subscribe(
      (data) => {
        this.selectedDriver = data;  // Store selected driver details
        this.driverForm = { ...data }; // Copy data to the form for editing
      },
      (error) => {
        console.error('Error fetching driver details:', error);
      }
    );
  }

  // Method to create a new driver
  createDriver(): void {
    this.driverService.createDriver(this.driverForm).subscribe(
      (response) => {
        console.log('Driver created successfully:', response);
        this.getAllDrivers();  // Refresh the driver list after creating a new driver
      },
      (error) => {
        console.error('Error creating driver:', error);
      }
    );
  }

  // Method to update driver details
  updateDriver(): void {
    if (this.selectedDriver && this.selectedDriver.id) {
      this.driverService.updateDriver(this.selectedDriver.id, this.driverForm).subscribe(
        (response) => {
          console.log('Driver updated successfully:', response);
          this.getAllDrivers();  // Refresh the driver list after updating
          this.selectedDriver = null; // Clear selected driver
        },
        (error) => {
          console.error('Error updating driver:', error);
        }
      );
    }
  }

  // Method to delete a driver by ID
  deleteDriver(id: number): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(id).subscribe(
        (response) => {
          console.log('Driver deleted successfully:', response);
          this.getAllDrivers();  // Refresh the driver list after deletion
        },
        (error) => {
          console.error('Error deleting driver:', error);
        }
      );
    }
  }

  // Reset form data
  resetForm(): void {
    this.driverForm = {};
    this.selectedDriver = null;
  }
}