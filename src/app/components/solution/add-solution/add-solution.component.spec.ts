import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IssueService } from 'src/app/services/issue/issue.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { issue } from 'src/app/shared/mocks/issue-data.mock';
import { SeeImageIssueComponent } from 'src/app/shared/see-image-issue/see-image-issue.component';

import { AddSolutionComponent } from './add-solution.component';

describe('AddSolutionComponent', () => {
  let component: AddSolutionComponent;
  let fixture: ComponentFixture<AddSolutionComponent>;
  let issueService: IssueService
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSolutionComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolutionComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });

  it('should get the issue', fakeAsync(() => {
    const issueId = 'issueId';
    spyOn(issueService, 'getIssue').and.returnValue(of(issue));
    component.getInfo(issueId);
    tick();
    fixture.detectChanges();
    expect(component.dataSource).toEqual(issue);
  }));

  it('should open SeeImageIssueComponent with correct data if fileId is defined', () => {
    const fileId = 'fileId';

    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.getImageIssue(fileId);
    expect(dialog.open).toHaveBeenCalledWith(SeeImageIssueComponent, {
      width: '1000px',
      height: '750px',
      data: {
        fileId: fileId
      }
    });
  });

  it('should open DialogComponent with correct message if fileId is not defined', () => {
    const fileId = undefined;
    const msg = 'No hay archivos agregados para este Hallazgo.';
    const config = {
      width: '250px',
      height: '150px',
      data: {
        msg: msg
      }
    };

    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    spyOn(component, 'openDialog').and.returnValue(Promise.resolve(config));
    component.dialog = dialog;

    component.getImageIssue(fileId);
    expect(component.openDialog).toHaveBeenCalledWith(msg);
  });

  it('should upload files and open dialog with success message when number of files is less than the limit', () => {
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

    component.onFileSelected({ target: { files } }, issueId);
    expect(solutionService.verifyCountObjectFile).toHaveBeenCalledWith(issueId);
    expect(solutionService.uploadSolutionFile).toHaveBeenCalledWith(files, issueId);
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

    component.onFileSelected({ target: { files } }, issueId);
    expect(solutionService.verifyCountObjectFile).toHaveBeenCalledWith(issueId);
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

    component.onFileSelected({ target: { files } }, issueId);
    expect(solutionService.verifyCountObjectFile).toHaveBeenCalledWith(issueId);
    expect(solutionService.uploadSolutionFile).toHaveBeenCalledWith(files, issueId);
  });

  it('should not add a solution and open dialog with error message when form is invalid', () => {
    const issueId = 'issueId';
    const addSolutionForm = jasmine.createSpyObj({ invalid: true });
    component.addSolutionForm = addSolutionForm;
    const solutionService = jasmine.createSpyObj({ addSolution: of({}) });
    component.solutionService = solutionService;
    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.addSolution(issueId);
    expect(solutionService.addSolution).not.toHaveBeenCalled();
    expect(dialog.open).not.toHaveBeenCalled();
  });
});