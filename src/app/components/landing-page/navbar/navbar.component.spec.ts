import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new NavbarComponent(router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to logout route on logout', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/logout']);
  });
});