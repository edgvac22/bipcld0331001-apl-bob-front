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
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { UnauthorizedAccessComponent } from './components/main/unauthorized-access/unauthorized-access.component';
import { IssueComponent } from './components/issue/issue.component';
import { SolutionComponent } from './components/solution/solution.component';
import { ListIsueComponent } from './components/issue/list-isue/list-isue.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'; 
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
    LoginComponent
  ],
  imports: [
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
