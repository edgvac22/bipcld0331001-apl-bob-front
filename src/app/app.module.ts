import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBackgroundComponent } from './components/main/main-background/main-background.component';
import { MaintenanceComponent } from './components/main/maintenance/maintenance.component';
import { HomeComponent } from './components/landing-page/home/home.component';
import { NavbarComponent } from './components/landing-page/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { UnauthorizedAccessComponent } from './components/main/unauthorized-access/unauthorized-access.component';
import { IssueComponent } from './components/issue/issue.component';
import { SolutionComponent } from './components/solution/solution.component';
import { ListIsueComponent } from './components/issue/list-isue/list-isue.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListSolutionComponent } from './components/solution/list-solution/list-solution.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslatePaginatorComponent } from './shared/translate-paginator/translate-paginator.component';
import { AddSolutionComponent } from './components/solution/add-solution/add-solution.component';
import { UpdateSolutionComponent } from './components/solution/update-solution/update-solution.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment.dev';
import { SeeImageSolutionComponent } from './components/solution/update-solution/see-image-solution/see-image-solution.component';
import { SwiperModule } from "swiper/angular";
import { CreateIssueComponent } from './components/issue/create-issue/create-issue.component';
import { MatSelectModule } from '@angular/material/select';
import { SeeImageIssueComponent } from './shared/see-image-issue/see-image-issue.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DeleteSolutionComponent } from './components/solution/delete-solution/delete-solution.component';
import { LogoutComponent } from './components/landing-page/logout/logout.component';
import { DetailSolutionComponent } from './components/solution/detail-solution/detail-solution.component';
import { ListSolutionDeveloperComponent } from './components/solution/list-solution-developer/list-solution-developer.component';
import { NavbarDeveloperComponent } from './components/landing-page/navbar-developer/navbar-developer.component';
import { SeeImageDetailComponent } from './components/solution/detail-solution/see-image-detail/see-image-detail.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    MainBackgroundComponent,
    MaintenanceComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    UnauthorizedAccessComponent,
    IssueComponent,
    SolutionComponent,
    ListIsueComponent,
    MainComponent,
    ListSolutionComponent,
    TranslatePaginatorComponent,
    AddSolutionComponent,
    UpdateSolutionComponent,
    LoginComponent,
    SeeImageSolutionComponent,
    CreateIssueComponent,
    SeeImageIssueComponent,
    DialogComponent,
    DeleteSolutionComponent,
    LogoutComponent,
    DetailSolutionComponent,
    ListSolutionDeveloperComponent,
    NavbarDeveloperComponent,
    SeeImageDetailComponent
  ],
  imports: [
    SwiperModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.config.clientId,
        authority: environment.config.authority,
        redirectUri: environment.config.redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    HttpClient,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
