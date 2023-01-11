import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeeImageIssueComponent } from './see-image-issue.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IssueService } from 'src/app/services/issue/issue.service';
import { of } from 'rxjs/internal/observable/of';

describe('SeeImageIssueComponent', () => {
  let component: SeeImageIssueComponent;
  let fixture: ComponentFixture<SeeImageIssueComponent>;
  let issueService: IssueService;
  let imageFiles: any[] = [{    id: '1',    name: 'image1.jpg',    url: 'image1_url'  },  {    id: '2',    name: 'image2.jpg',    url: 'image2_url'  }];
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SeeImageIssueComponent ],
      providers: [
        { provide: IssueService, useValue: { getImageFiles: jasmine.createSpy('getImageFiles').and.returnValue(of(imageFiles)) } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { fileId: '1' } },
      ],
      imports: [HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageIssueComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService);
    fixture.detectChanges();
  });

  it('should call getImageFiles with fileId', () => {
    expect(issueService.getImageFiles).toHaveBeenCalledWith('1');
  });

  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});