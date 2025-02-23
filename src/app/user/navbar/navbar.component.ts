import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  getRole:string= '';

  constructor(public authService: AuthService) { } 

  ngOnInit() {
    this.getRole = this.authService.getUserData().role;
  }
}
