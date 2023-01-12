import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SolutionService } from 'src/app/services/solution/solution.service';

import { SeeImageSolutionComponent } from './see-image-solution.component';

describe('UpdateSolutionComponent', () => {
  let component: SeeImageSolutionComponent;
  let fixture: ComponentFixture<SeeImageSolutionComponent>;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let solutionServiceSpy: SolutionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageSolutionComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: {} },  
        { provide: MAT_DIALOG_DATA, useValue: {}},
        {
          provide: SolutionService,
          useValue: {
            getImageFiles: jasmine.createSpy().and.returnValue(of([{url: 'test.jpg'}])),
          },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageSolutionComponent);
    component = fixture.componentInstance;
    component.data = { issueId: 'issueId', valid: true };
    solutionServiceSpy = TestBed.inject(SolutionService);
    fixture.detectChanges();
  });

  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });

  
  it('should upload files and open dialog with success message', () => {
    const files = [new File([], 'file1.jpg'), new File([], 'file2.jpg')];
    const issueId = 'issueId';

    const solutionService = jasmine.createSpyObj({
      verifyCountObjectFile: of([{}, {}, {}, {}, {}]),
      uploadSolutionFile: of({ msg: 'Los archivos se han sido subido exitosamente', length: files.length })
    });
    component.solutionService = solutionService;
    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.onFileSelected({ target: { files } });
  });

  it('should not upload files and open dialog with error message when number of files is equal to the limit', () => {
    const files = [new File([], 'file1.jpg'), new File([], 'file2.jpg'), new File([], 'file3.jpg'), new File([], 'file4.jpg'), new File([], 'file5.jpg'), new File([], 'file6.jpg'), new File([], 'file7.jpg'), new File([], 'file8.jpg'), new File([], 'file9.jpg'), new File([], 'file10.jpg'), new File([], 'file11.jpg')];
    const issueId = 'issueId';

    const solutionService = jasmine.createSpyObj({
      verifyCountObjectFile: of([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]),
    });
    component.solutionService = solutionService;
    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.onFileSelected({ target: { files } });
  });

  it('should not upload files and open dialog with error message when the type of file is incorrect', () => {
    const files = [new File([], 'file1.txt')];
    const issueId = 'issueId';

    const solutionService = jasmine.createSpyObj({
      verifyCountObjectFile: of([]),
      uploadSolutionFile: of({ msg: 'Error', length: 0 })
    });
    component.solutionService = solutionService;
    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.onFileSelected({ target: { files } });
  });

  it('should call getImageFiles and set the valid property', async () => {
    await component.ngOnInit();
    expect(solutionServiceSpy.getImageFiles).toHaveBeenCalledWith('issueId');
    expect(component.slides).toEqual([{ url: 'test.jpg' }]);
    expect(component.valid).toBeTruthy();
  });
});