import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

import { ListSolutionDeveloperComponent } from './list-solution-developer.component';

describe('ListSolutionComponent', () => {
  let component: ListSolutionDeveloperComponent;
  let fixture: ComponentFixture<ListSolutionDeveloperComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSolutionDeveloperComponent ],
      imports: [ MatDialogModule, HttpClientTestingModule, RouterModule ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolutionDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to detail-solution`, () => {
    const solutionId = '1283718273-aiqwe-123128-amncha'
    component.detailSolution(solutionId)
    expect(routerSpy.navigate).toHaveBeenCalledWith([`solution/${solutionId}`]);
 });
});