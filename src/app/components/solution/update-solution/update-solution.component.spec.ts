import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSolutionComponent } from './update-solution.component';

describe('UpdateSolutionComponent', () => {
  let component: UpdateSolutionComponent;
  let fixture: ComponentFixture<UpdateSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
