import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {
  MsalModule,
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular'
import { HomeComponent } from './home.component'
import { MatDialog } from '@angular/material/dialog'
import { HttpClient } from '@angular/common/http'
import { PublicClientApplication, InteractionType } from '@azure/msal-browser'
import { OverlayModule } from '@angular/cdk/overlay'
import { UserRoleService } from 'src/app/services/role/user-role.service'

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let authService: MsalService
  let broadcastService: MsalBroadcastService
  let httpTestingController: HttpTestingController
  let userRoleService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        HttpClientTestingModule,
        MsalModule.forRoot(
          new PublicClientApplication({
            auth: {
              clientId: 'clientId',
              authority: 'authority',
              redirectUri: 'redirect-uri',
            },
            cache: {
              cacheLocation: 'localStorage',
            },
          }),
          {
            interactionType: InteractionType.Redirect,
            authRequest: {
              scopes: ['user.read'],
            },
          },
          {
            interactionType: InteractionType.Redirect,
            protectedResourceMap: new Map([
              ['https://graph.microsoft.com/v1.0/me', ['user.read']],
            ]),
          },
        ),
      ],
      declarations: [HomeComponent],
      providers: [
        MsalService,
        MsalBroadcastService,
        MatDialog,
        {
          provide: MSAL_GUARD_CONFIG,
          useValue: { authRequest: { scopes: ['user.read'] } },
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    fixture.detectChanges()
    authService = TestBed.inject(MsalService)
    broadcastService = TestBed.inject(MsalBroadcastService)
    userRoleService = TestBed.inject(UserRoleService)
    httpTestingController = TestBed.inject(HttpTestingController)
    component = new HomeComponent(
      authService,
      broadcastService,
      TestBed.inject(HttpClient),
      userRoleService,
    )
    spyOn(authService.instance, 'getAllAccounts').and.returnValue([]);
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should save in locaStorage the email', fakeAsync(() => {
    fixture.detectChanges();
    const request = httpTestingController.expectOne({
      url:  'https://graph.microsoft.com/v1.0/me',
      method: 'GET'
    });
    request.flush({ userPrincipalName: 'mockDisplayName' });
    flush();
    fixture.detectChanges();
  }));

  it('should set login display to false if there are no accounts', () => {
    component.setLoginDisplay();
    expect(component.loginDisplay).toBeFalsy();
  });

  it('should call ngOnInit method', () => {
    component.ngOnInit();
  });
})