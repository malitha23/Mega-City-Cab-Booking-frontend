import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-navbar-moderator',
  templateUrl: './navbar-moderator.component.html',
  styleUrl: './navbar-moderator.component.css'
})
export class NavbarModeratorComponent {

    constructor(public authService: AuthService) { } 

}
