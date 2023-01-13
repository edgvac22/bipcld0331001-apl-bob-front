import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { CreateIssueComponent } from './create-issue.component'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { of } from 'rxjs'
import { IssueService } from 'src/app/services/issue/issue.service'
import { AreaService } from 'src/app/services/area/area.service'
import { EnvironmentService } from 'src/app/services/environment/environment.service'

describe('CreateIssueComponent', () => {
  let component: CreateIssueComponent
  let fixture: ComponentFixture<CreateIssueComponent>
  let dialogRef: MatDialogRef<CreateIssueComponent>
  let issueService: jasmine.SpyObj<IssueService>
  let formGroup: FormGroup
  let dialog: MatDialog
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let createIssueComponent: CreateIssueComponent;
  let issueServiceSpy: IssueService;
  let createIssueForm: FormGroup;

  beforeEach(() => {
    issueServiceSpy = new IssueService(null);
    spyOn(issueServiceSpy, 'createIssue').and.returnValue(of({}));
    createIssueForm = new FormGroup({
      area: new FormControl('testArea'),
      environment: new FormControl('testEnvironment'),
      issueDetail: new FormControl('testIssueDetail')
    });
    createIssueComponent = new CreateIssueComponent(null, null, null, issueService, null);
    createIssueComponent.createIssueForm = createIssueForm;
    const areaSpy = jasmine.createSpyObj('AreaService', ['listArea'])
    const environmentSpy = jasmine.createSpyObj('EnvironmentService', [
      'listEnvironment',
    ])
    const issueSpy = jasmine.createSpyObj('IssueService', [
      'createIssue',
      'listIssue',
      'getIssue',
    ])

    TestBed.configureTestingModule({
      declarations: [CreateIssueComponent],
      providers: [
        { provide: AreaService, useValue: areaSpy },
        { provide: EnvironmentService, useValue: environmentSpy },
        { provide: IssueService, useValue: issueSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: {} },
      ],
      imports: [
        MatDialogModule,
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIssueComponent)
    component = fixture.componentInstance
    dialogRef = TestBed.inject(MatDialogRef)
    formGroup = new FormGroup({
      area: new FormControl(null, [Validators.required]),
      environment: new FormControl(null, [Validators.required]),
      issueDetail: new FormControl(null, [
        Validators.required,
        Validators.minLength(21),
      ]),
    })
    component.createIssueForm = formGroup
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("should create an issue without file id", () => {
    createIssueComponent.save();
  });

  it("should create an issue with file id", () => {
    createIssueComponent.fileId = 'file1'
    createIssueComponent.save();
  });

  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });

  it('should upload a file', () => {
    component.onFileSelected(Event)
  });

  it('should list areas and store them in local storage if not already stored', async () => {
    const areaService = jasmine.createSpyObj('AreaService', ['listArea']);
    component.areaService = areaService;
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    const areas = ['Ingenieria de Software', 'Procesos de TI'];
    areaService.listArea.and.returnValue(of(areas.map(name => ({ name }))));
    component.listArea();
    expect(localStorage.getItem).toHaveBeenCalledWith('area');
    expect(areaService.listArea).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('area', JSON.stringify(areas));
  });

  it('should use stored areas if already stored', async () => {
    const areaService = jasmine.createSpyObj('AreaService', ['listArea']);
    component.areaService = areaService;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['Ingenieria de Software', 'Procesos de TI']));
    spyOn(localStorage, 'setItem');
    component.listArea();
    expect(localStorage.getItem).toHaveBeenCalledWith('area');
    expect(areaService.listArea).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should list environments and store them in local storage if not already stored', async () => {
    const environmentService = jasmine.createSpyObj('EnvironmentService', ['listEnvironment']);
    component.environmentService = environmentService;
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    const environments = ['Desarrollo', 'Calidad'];
    environmentService.listEnvironment.and.returnValue(of(environments.map(name => ({ name }))));
    component.listEnvironment();
    expect(localStorage.getItem).toHaveBeenCalledWith('environment');
    expect(environmentService.listEnvironment).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('environment', JSON.stringify(environments));
  });

  it('should use stored environments if already stored', async () => {
    const environmentService = jasmine.createSpyObj('EnvironmentService', ['listEnvironment']);
    component.environmentService = environmentService;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['Desarrollo', 'Calidad']));
    spyOn(localStorage, 'setItem');
    component.listEnvironment();
    expect(localStorage.getItem).toHaveBeenCalledWith('environment');
    expect(environmentService.listEnvironment).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should upload files and open dialog with success message', () => {
    const files = [new File([], 'file1.jpg'), new File([], 'file2.jpg')];

    issueService = jasmine.createSpyObj({
      uploadFile: of({ msg: 'Los archivos se han sido subido exitosamente', length: files.length })
    });
    component.issueService = issueService;
    dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.onFileSelected({ target: { files } });
  });

  it('should not upload files and open dialog with error message when number of files is equal to the limit', () => {
    const files = [new File([], 'file1.jpg'), new File([], 'file2.jpg'), new File([], 'file3.jpg'), new File([], 'file4.jpg'), new File([], 'file5.jpg'), new File([], 'file6.jpg')];

    issueService = jasmine.createSpyObj({
      uploadFile: of({ msg: 'Los archivos se han sido subido exitosamente', length: files.length })
    });
    component.issueService = issueService;
    dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.onFileSelected({ target: { files } });
  });

  it('should not upload files and open dialog with error message when the type of file is incorrect', () => {
    const files = [new File([], 'file1.txt')];

    issueService = jasmine.createSpyObj({
      uploadFile: of({ msg: 'Error', length: 0 })
    });
    component.issueService = issueService;
    dialogRef = jasmine.createSpyObj({ afterClosed: of() });
    dialog = jasmine.createSpyObj({ open: dialogRef });
    component.dialog = dialog;

    component.onFileSelected({ target: { files } });
  });
})