import { NavbarDeveloperComponent } from './navbar-developer.component';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarDeveloperComponent;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new NavbarDeveloperComponent(router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to logout route on logout', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/logout']);
  });
});