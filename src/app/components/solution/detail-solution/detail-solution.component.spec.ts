import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DetailSolutionComponent } from './detail-solution.component';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SeeImageDetailComponent } from './see-image-detail/see-image-detail.component';
import { solution } from 'src/app/shared/mocks/solution-data.mock';

describe('DetailSolutionComponent', () => {
  let component: DetailSolutionComponent;
  let fixture: ComponentFixture<DetailSolutionComponent>;
  let solutionService: SolutionService;
  let route: ActivatedRoute;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [DetailSolutionComponent],
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
    component.solutionService = solutionService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open SeeImageSolutionComponent with correct data', () => {
    const issueId = 'issueId';
    const total = 2;
    const dataObject = Array(total);

    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    const solutionServiceSpy = jasmine.createSpyObj({ verifyCountObjectFile: of(dataObject) });

    component.dialog = dialog;
    component.solutionService = solutionServiceSpy;

    component.getImages(issueId);
    expect(solutionServiceSpy.verifyCountObjectFile).toHaveBeenCalledWith(issueId);

    expect(dialog.open).toHaveBeenCalledWith(SeeImageDetailComponent, {
      width: '900px',
      height: '750px',
      data: {
        issueId: issueId,
        valid: true,
      }
    });
  });

  it('should call getInfo() on init', () => {
    spyOn(component, 'getInfo');
    component.ngOnInit();
    expect(component.getInfo).toHaveBeenCalled();
  });

  it('should call openDialog()', () => {
    component.openDialog('msg');
  });
});