import { Component, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-login',
  templateUrl: './quick-login.component.html',
  styleUrls: ['./quick-login.component.scss']
})
export class QuickLoginComponent {

  @Input() visible: boolean = false;  // To control visibility from parent component
  @Output() loginData = new EventEmitter<{ username: string, password: string }>();  // Emit username and password to parent component
  
  username: string = '';
  password: string = '';

  // Method called on form submission
  onSubmit() {
    // Emit the username and password back to the parent component
    this.loginData.emit({ username: this.username, password: this.password });
  }

  // Method to handle cancel button
  cancel() {
    this.visible = false;  // Close the dialog if cancel is clicked
  }
}
