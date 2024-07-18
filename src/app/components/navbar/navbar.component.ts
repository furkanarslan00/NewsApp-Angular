import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarExpanded = false;

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
    const navbarList = document.querySelector('.navbar-list');
    if (navbarList) {
      navbarList.classList.toggle('navbar-expanded');
    }
  }
}
