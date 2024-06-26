import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListIsueComponent } from './list-isue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IssueService } from 'src/app/services/issue/issue.service';
import { issueData, issues } from 'src/app/shared/mocks/issue-data.mock';

describe('ListIsueComponent', () => {
  let component: ListIsueComponent;
  let fixture: ComponentFixture<ListIsueComponent>;
  let issueService: IssueService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIsueComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIsueComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work the method createSolution', () => {
    const issueId = '123718273-asjdfh-12837-cansmf'
    component.createSolution(issueId);
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

  it('should retrieve solutions', () => {
    spyOn(issueService, 'listIssue').and.returnValue(of(issues));
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(issues);
  });

  it('should filter solutions by title', () => {
    spyOn(issueService, 'listIssue').and.returnValue(of(issues));
    component.ngOnInit();
    component.issueDetailFilter.setValue('Solution 1');
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.dataSource.data[0]).toEqual(issues[0]);
  });

  it('should filter solutions by area', () => {
    spyOn(issueService, 'listIssue').and.returnValue(of(issues));
    component.ngOnInit();
    component.areaFilter.setValue('Ingenieria de Software');
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.dataSource.data[0]).toEqual(issues[0]);
  });

  it('should filter solutions by environment', () => {
    spyOn(issueService, 'listIssue').and.returnValue(of(issues));
    component.ngOnInit();
    component.environmentFilter.setValue('Desarrollo');
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.dataSource.data[0]).toEqual(issues[0]);
  });

  it('should return true when topFilter is true and issueDetailFound or areaFound or environmentFound are true', () => {
    let data = issueData;
    let filter = JSON.stringify({ issueDetail: 'Tengo un', area: 'Ingenieria de Software', environment: 'Desarrollo', topFilter: true });
    let result = component.customFilterPredicate()(data, filter);
    expect(result).toBeTruthy();
  });
});