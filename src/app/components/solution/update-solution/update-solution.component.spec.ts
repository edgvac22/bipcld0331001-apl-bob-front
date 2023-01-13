import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IssueService } from 'src/app/services/issue/issue.service';
import { SolutionService } from 'src/app/services/solution/solution.service';
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
  let updateSolutionComponent: UpdateSolutionComponent
  let solutionService: SolutionService
  let dialog: DialogComponent
  let updateSolutionForm: FormGroup

  beforeEach(async () => {
    solutionService = new SolutionService(null);
    spyOn(solutionService, 'updateSolution').and.returnValue(of({}));
    dialog = new DialogComponent(null);
    updateSolutionForm = new FormGroup({
        solutionTitle: new FormControl('testSolutionTitle'),
        solutionDetail: new FormControl('testSolutionDetail')
    });
    updateSolutionComponent = new UpdateSolutionComponent(null, null,solutionService, null, null);
    updateSolutionComponent.updateSolutionForm = updateSolutionForm;
    spyOn(localStorage, 'getItem').and.returnValue('test@email.com');
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

  it("should add solution", () => {
    updateSolutionComponent.updateSolution("testIssueId");
    expect(solutionService.updateSolution).toHaveBeenCalledWith(
      "testIssueId",
      {
        solutionUser: "test@email.com",
        solutionTitle: "testSolutionTitle",
        solutionDetail: "testSolutionDetail"
      }
    );
  });

  it('should open SeeImageSolutionComponent with correct data', () => {
    const issueId = 'issueId';
    const total = 2;
    const dataObject = Array(total);

    const dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    const dialogSpy = jasmine.createSpyObj({ open: dialogRef });
    const solutionServiceSpy = jasmine.createSpyObj({ verifyCountObjectFile: of(dataObject) });

    component.dialog = dialogSpy;
    component.solutionService = solutionServiceSpy;

    component.getImages(issueId);
    expect(solutionServiceSpy.verifyCountObjectFile).toHaveBeenCalledWith(issueId);

    expect(dialogSpy.open).toHaveBeenCalledWith(SeeImageSolutionComponent, {
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
    const dialogSpy = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialogSpy;

    component.getImageIssue(fileId);
    expect(dialogSpy.open).toHaveBeenCalledWith(SeeImageIssueComponent, {
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
    const dialogSpy = jasmine.createSpyObj({ open: dialogRef });
    spyOn(component, 'openDialog').and.returnValue(Promise.resolve(config));
    component.dialog = dialogSpy;

    component.getImageIssue(fileId);
    expect(component.openDialog).toHaveBeenCalledWith(msg);
  });
});