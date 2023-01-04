import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalModule, MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: MsalService;
  let broadcastService: MsalBroadcastService;
  let msalGuardConfig: MsalGuardConfiguration;
  let msalInstance: PublicClientApplication;

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
    component = TestBed.createComponent(LoginComponent).componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

});