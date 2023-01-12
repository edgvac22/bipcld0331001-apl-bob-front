import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { SolutionService } from 'src/app/services/solution/solution.service';

import { SeeImageDetailComponent } from './see-image-detail.component';

describe('SeeImageDetailComponent', () => {
  let component: SeeImageDetailComponent;
  let fixture: ComponentFixture<SeeImageDetailComponent>;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let solutionServiceSpy: SolutionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageDetailComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRefSpy },
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {
          provide: SolutionService,
          useValue: {
            getImageFiles: jasmine.createSpy().and.returnValue(of([{url: 'test.jpg'}])),
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageDetailComponent);
    component = fixture.componentInstance;
    component.data = { issueId: 'issueId', valid: true };
    solutionServiceSpy = TestBed.inject(SolutionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });

  it('should call getImageFiles and set the valid property', async () => {
    await component.ngOnInit();
    expect(solutionServiceSpy.getImageFiles).toHaveBeenCalledWith('issueId');
    expect(component.slides).toEqual([{ url: 'test.jpg' }]);
    expect(component.valid).toBeTruthy();
  });
});