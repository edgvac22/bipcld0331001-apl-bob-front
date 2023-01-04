import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-developer',
  templateUrl: './navbar-developer.component.html',
  styleUrls: ['./navbar-developer.component.css']
})
export class NavbarDeveloperComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/logout']);
  }

}
