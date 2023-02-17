import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { EndSessionRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: MsalService,
    ) { }

  ngOnInit(): void {
    const request: EndSessionRequest = {
      postLogoutRedirectUri: 'http://localhost:4200/login'
    };
    this.authService.logoutRedirect(request);
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isDeveloper');
  }
}
