import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IssueService } from 'src/app/services/issue/issue.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { issue } from 'src/app/shared/mocks/issue-data.mock';
import { SeeImageIssueComponent } from 'src/app/shared/see-image-issue/see-image-issue.component';
import { SeeImageSolutionComponent } from './see-image-solution/see-image-solution.component';

import { UpdateSolutionComponent } from './update-solution.component';

describe('UpdateSolutionComponent', () => {
  let component: UpdateSolutionComponent;
  let fixture: ComponentFixture<UpdateSolutionComponent>;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let issueService: IssueService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSolutionComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSolutionComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService)
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

  it('should get the issue', fakeAsync(() => {
    const issueId = 'issueId';
    spyOn(issueService, 'getIssue').and.returnValue(of(issue));
    component.getInfo(issueId);
    tick();
    fixture.detectChanges();
    expect(component.dataSource).toEqual(issue);
  }));

  it('should open SeeImageSolutionComponent with correct data', () => {
    const issueId = 'issueId';
    const total = 2;
    const dataObject = Array(total);

    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialog = jasmine.createSpyObj({ open: dialogRef });
    const solutionService = jasmine.createSpyObj({ verifyCountObjectFile: of(dataObject) });

    component.dialog = dialog;
    component.solutionService = solutionService;

    component.getImages(issueId);
    expect(solutionService.verifyCountObjectFile).toHaveBeenCalledWith(issueId);

    expect(dialog.open).toHaveBeenCalledWith(SeeImageSolutionComponent, {
      width: '1000px',
      height: '750px',
      data: {
        issueId: issueId,
        valid: true,
      }
    });
  });

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
});