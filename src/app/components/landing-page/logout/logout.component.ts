import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { EndSessionRequest } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

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
      postLogoutRedirectUri: environment.config.postLogoutRedirectUri
    };
    this.authService.logoutRedirect(request);
    localStorage.removeItem('email');
  }
}
