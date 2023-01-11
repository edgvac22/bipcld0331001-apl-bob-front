import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { DetailSolutionComponent } from './detail-solution.component';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SeeImageSolutionComponent } from '../update-solution/see-image-solution/see-image-solution.component';

describe('DetailSolutionComponent', () => {
  let component: DetailSolutionComponent;
  let fixture: ComponentFixture<DetailSolutionComponent>;
  let solutionService: SolutionService;
  let route: ActivatedRoute;
  let dialog: MatDialog;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSolutionComponent ],
      providers: [
        { provide: SolutionService, useValue: jasmine.createSpyObj('SolutionService', ['detailSolution', 'verifyCountObjectFile']) },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSolutionComponent);
    component = fixture.componentInstance;
    solutionService = TestBed.inject(SolutionService);
    route = TestBed.inject(ActivatedRoute);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open SeeImageSolutionComponent with correct data', () => {
    const issueId = 'issueId';
    const total = 2;
    const dataObject = Array(total);

    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    dialog = jasmine.createSpyObj({ open: dialogRef });
    solutionService = jasmine.createSpyObj({ verifyCountObjectFile: of(dataObject) });

    component.dialog = dialog;
    component.solutionService = solutionService;

    component.getImages(issueId);
    expect(solutionService.verifyCountObjectFile).toHaveBeenCalledWith(issueId);

    expect(dialog.open).toHaveBeenCalledWith(SeeImageSolutionComponent, {
      width: '900px',
      height: '750px',
      data: {
        issueId: issueId,
        valid: true,
      }
    });
  });
});