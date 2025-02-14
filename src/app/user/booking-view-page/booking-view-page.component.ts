import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/ItemService';
import { AuthService } from '../../services/AuthService';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-booking-view-page',
  templateUrl: './booking-view-page.component.html',
  styleUrls: ['./booking-view-page.component.css'],
})
export class BookingViewPageComponent implements OnInit {
  item: any;
  loading: boolean = false;
  visible: boolean = false;  // Property to toggle visibility of the dialog
  username: string = '';  // Property to hold the username
  password: string = '';


  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL and load the item
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadItemById(id);
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();  // Check from authentication service
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

  handleBookingClick() {
    console.log(this.isAuthenticated);
    if (!this.isAuthenticated) {
        this.toggleDialog();
    } else {
        // Proceed with the booking process
        console.log("Booking confirmed!");
    }
}

  toggleDialog() {
    this.visible = !this.visible;  // Toggle visibility of dialog
  }

    // Method to handle the emitted data from child component
    onLoginDataReceived(data: { username: string, password: string }) {
      this.username = data.username;  // Capture the username
      this.password = data.password;  // Capture the password
      console.log('Received Username:', this.username);
      console.log('Received Password:', this.password);
      this.authService.signIn({ email: this.username, password: this.password }).subscribe(
        (response) => {
          // Handle the response, e.g., store the JWT token and navigate
          console.log(response);
        },
        (error) => {
          console.error('Error during sign in:', error);
        }
      );
      // You can now use the username and password for authentication or other logic
    }

}
