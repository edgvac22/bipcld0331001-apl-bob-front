import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalService, MsalModule  } from '@azure/msal-angular';
import { EndSessionRequest, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: MsalService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(MsalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the user out and remove the email from local storage', () => {
    // Arrange
    const request: EndSessionRequest = {
      postLogoutRedirectUri: 'http://localhost:4200/login'
    };
    localStorage.setItem('email', 'user@example.com');
    spyOn(authService, 'logoutRedirect').and.stub();

    // Act
    component.ngOnInit();

    // Assert
    expect(authService.logoutRedirect).toHaveBeenCalledWith(request);
    expect(localStorage.getItem('email')).toBeNull();
  });
});