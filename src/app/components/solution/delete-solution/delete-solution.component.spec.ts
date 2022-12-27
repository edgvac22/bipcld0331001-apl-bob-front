import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSolutionComponent } from './delete-solution.component';

describe('DeleteSolutionComponent', () => {
  let component: DeleteSolutionComponent;
  let fixture: ComponentFixture<DeleteSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
