import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { CreateIssueComponent } from './create-issue.component'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { of } from 'rxjs'
import { IssueService } from 'src/app/services/issue/issue.service'
import { AreaService } from 'src/app/services/area/area.service'
import { EnvironmentService } from 'src/app/services/environment/environment.service'
import { DialogComponent } from 'src/app/shared/dialog/dialog.component'

describe('CreateIssueComponent', () => {
  let component: CreateIssueComponent
  let fixture: ComponentFixture<CreateIssueComponent>
  let dialogRef: MatDialogRef<CreateIssueComponent>
  let issueService: jasmine.SpyObj<IssueService>
  let formGroup: FormGroup
  let dialog: MatDialog
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(() => {
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

  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });

  it('should save the issue if form is not invalid and fileId is empty or undefined', () => {
    component.save()
  });

  it('should list all areas', () => {
    component.listArea()
  });

  it('should list all environments', () => {
    component.listEnvironment()
  });

  it('should upload a file', () => {
    component.onFileSelected(Event)
  });

  it('should list areas and store them in local storage if not already stored', async () => {
    const areaService = jasmine.createSpyObj('AreaService', ['listArea']);
    component.areaService = areaService;
    spyOn(localStorage,'getItem').and.returnValue(null);
    spyOn(localStorage,'setItem');
    const areas = ['Ingenieria de Software', 'Procesos de TI'];
    areaService.listArea.and.returnValue(of(areas.map(name =>({name}))));
    component.listArea();
    expect(localStorage.getItem).toHaveBeenCalledWith('area');
    expect(areaService.listArea).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('area', JSON.stringify(areas));
  });
  
  it('should use stored areas if already stored', async () => {
    const areaService = jasmine.createSpyObj('AreaService', ['listArea']);
    component.areaService = areaService;
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(['Ingenieria de Software', 'Procesos de TI']));
    spyOn(localStorage,'setItem');
    component.listArea();
    expect(localStorage.getItem).toHaveBeenCalledWith('area');
    expect(areaService.listArea).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should list environments and store them in local storage if not already stored', async () => {
    const environmentService = jasmine.createSpyObj('EnvironmentService', ['listEnvironment']);
    component.environmentService = environmentService;
    spyOn(localStorage,'getItem').and.returnValue(null);
    spyOn(localStorage,'setItem');
    const environments = ['Desarrollo', 'Calidad'];
    environmentService.listEnvironment.and.returnValue(of(environments.map(name =>({name}))));
    component.listEnvironment();
    expect(localStorage.getItem).toHaveBeenCalledWith('environment');
    expect(environmentService.listEnvironment).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('environment', JSON.stringify(environments));
  });
  
  it('should use stored environments if already stored', async () => {
    const environmentService = jasmine.createSpyObj('EnvironmentService', ['listEnvironment']);
    component.environmentService = environmentService;
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(['Desarrollo', 'Calidad']));
    spyOn(localStorage,'setItem');
    component.listEnvironment();
    expect(localStorage.getItem).toHaveBeenCalledWith('environment');
    expect(environmentService.listEnvironment).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
})