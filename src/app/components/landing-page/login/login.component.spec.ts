import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalModule, MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { of } from 'rxjs';
import { InteractionType, PopupRequest, PublicClientApplication, RedirectRequest } from '@azure/msal-browser';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: MsalService;
  let broadcastService: MsalBroadcastService;
  let msalInstance: PublicClientApplication;
  let router: Router;
  let msalGuardConfig = { authRequest: { scopes: ['user.read'] } }

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MsalModule.forRoot(new PublicClientApplication({
          auth: {
            clientId: 'clientId',
            authority: 'authority',
            redirectUri: 'redirect-uri'
          },
          cache: {
            cacheLocation: 'localStorage',
          }
        }), {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['user.read'],
          }
        }, {
          interactionType: InteractionType.Redirect,
          protectedResourceMap: new Map([
            ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ])
        })
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        MsalBroadcastService,
        {
          provide: MSAL_GUARD_CONFIG,
          useValue: { authRequest: { scopes: ['user.read'] } }
        },
      ]
    }).compileComponents();

    authService = TestBed.inject(MsalService);
    broadcastService = TestBed.inject(MsalBroadcastService);
    router = TestBed.inject(Router);
    spyOn(authService.instance, 'getAllAccounts').and.returnValue([]);
    spyOn(authService, 'loginPopup').and.returnValue(of(null));
    spyOn(authService, 'loginRedirect').and.returnValue(of(null));
    component = TestBed.createComponent(LoginComponent).componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set login display to false if there are no accounts', () => {
    component.setLoginDisplay();
    expect(component.loginDisplay).toBeFalsy();
  });

  it('should call loginPopup method if authRequest is defined', () => {
    msalGuardConfig.authRequest = { scopes: ['user.read'] };
    component.login();
    expect(authService.loginPopup).toHaveBeenCalled();
    expect(authService.loginPopup).toHaveBeenCalledWith({ scopes: ['user.read'] } as PopupRequest);
  });

  it('should call ngOnInit method', () => {
    component.ngOnInit();
  });
});