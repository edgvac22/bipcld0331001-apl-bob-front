import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }

}
