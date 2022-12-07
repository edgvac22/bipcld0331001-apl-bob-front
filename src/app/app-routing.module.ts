import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIsueComponent } from 'src/app/components/issue/list-isue/list-isue.component'
import { HomeComponent } from './components/landing-page/home/home.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { AddSolutionComponent } from './components/solution/add-solution/add-solution.component';
import { ListSolutionComponent } from './components/solution/list-solution/list-solution.component';

const routes: Routes = [
  {path: 'issue/list', component: ListIsueComponent},
  {path: 'solution/list', component: ListSolutionComponent},
  {path: 'solution/add/:issueId', component: AddSolutionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
