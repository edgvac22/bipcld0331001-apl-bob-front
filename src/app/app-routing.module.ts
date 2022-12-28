import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIsueComponent } from 'src/app/components/issue/list-isue/list-isue.component'
import { HomeComponent } from './components/landing-page/home/home.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { ListSolutionComponent } from './components/solution/list-solution/list-solution.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { MsalGuard } from '@azure/msal-angular';
import { LogoutComponent } from './components/landing-page/logout/logout.component';

const isIframe = window !== window.parent && !window.opener;

const routes: Routes = [
  { path: 'issue/list', component: ListIsueComponent },
  { path: 'solution/list', component: ListSolutionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [MsalGuard]},
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '', pathMatch: 'full', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
