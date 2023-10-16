import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName:any;

  constructor(private route:Router){
    this.userName=localStorage.getItem("userName");
  }
  faChevronDown = faChevronDown

  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Perform logout logic here, e.g., clear user session, redirect, etc.
    localStorage.removeItem("userToken");
     this.route.navigate(['/login']);
  }
}
