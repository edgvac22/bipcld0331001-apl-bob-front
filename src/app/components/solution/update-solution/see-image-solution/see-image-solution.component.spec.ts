import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeImageSolutionComponent } from './see-image-solution.component';

describe('SeeImageSolutionComponent', () => {
  let component: SeeImageSolutionComponent;
  let fixture: ComponentFixture<SeeImageSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
