import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;

  beforeEach(() => {
    component = new NotFoundComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a new window with the correct URL when contactIngSw is called', () => {
    spyOn(window, 'open');
    component.contactIngSw();
    expect(window.open).toHaveBeenCalledWith(component.mailText, '_blank');
  });
});