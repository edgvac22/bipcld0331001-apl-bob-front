import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { AreaService } from 'src/app/services/area/area.service';
import { EnvironmentService } from 'src/app/services/environment/environment.service';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { solutionData, solutions } from 'src/app/shared/mocks/solution-data.mock';

import { ListSolutionComponent } from './list-solution.component';

describe('ListSolutionComponent', () => {
  let component: ListSolutionComponent;
  let fixture: ComponentFixture<ListSolutionComponent>;
  let solutionService: SolutionService;
  const areaSpy = jasmine.createSpyObj('AreaService', ['listArea'])
  const environmentSpy = jasmine.createSpyObj('EnvironmentService', [
    'listEnvironment',
  ])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSolutionComponent],
      imports: [MatDialogModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: AreaService, useValue: areaSpy },
        { provide: EnvironmentService, useValue: environmentSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolutionComponent);
    solutionService = TestBed.inject(SolutionService);
    component = fixture.componentInstance;
    component.input = { nativeElement: { value: 'testValue' } } as ElementRef;
    component.areaFilter = new FormControl('testValue');
    component.environmentFilter = new FormControl('testValue');
    component.dataSource = {
      filter: 'testValue',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update solution', () => {
    component.updateSolution('issueId');
  });

  it('should remove solution', () => {
    component.removeSolution('issueId', 'solutionId');
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

  it('should retrieve solutions', () => {
    spyOn(solutionService, 'listSolution').and.returnValue(of(solutions));
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(solutions);
  });

  it('should filter solutions by title', () => {
    spyOn(solutionService, 'listSolution').and.returnValue(of(solutions));
    component.ngOnInit();
    component.solutionTitleFilter.setValue('Solution 1');
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.dataSource.data[0]).toEqual(solutions[0]);
  });

  it('should filter solutions by area', () => {
    spyOn(solutionService, 'listSolution').and.returnValue(of(solutions));
    component.ngOnInit();
    component.areaFilter.setValue('Ingenieria de Software');
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.dataSource.data[0]).toEqual(solutions[0]);
  });

  it('should filter solutions by environment', () => {
    spyOn(solutionService, 'listSolution').and.returnValue(of(solutions));
    component.ngOnInit();
    component.environmentFilter.setValue('Desarrollo');
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.dataSource.data[0]).toEqual(solutions[0]);
  });

  it('should return true when topFilter is true and solutionTitleFound or areaFound or environmentFound are true', () => {
    let data = solutionData;
    let filter = JSON.stringify({ solutionTitle: 'Solucion del', area: 'Ingenieria de Software', environment: 'Desarrollo', topFilter: true });
    let result = component.customFilterPredicate()(data, filter);
    expect(result).toBeTruthy();
  });

  it('should announce the sort direction when direction is present in sortState', () => {
    let sortState = { direction: 'asc' as 'asc', active: 'example' };
    let liveAnnouncer = jasmine.createSpyObj('LiveAnnouncer', ['announce']);
    component._liveAnnouncer = liveAnnouncer;
    component.announceSortChange(sortState);
    expect(liveAnnouncer.announce).toHaveBeenCalledWith('Sorted ascending');
  });

  it('should announce that sorting is cleared when direction is not present in sortState', () => {
    let sortState = { active: 'example', direction: '' as '' };
    let liveAnnouncer = jasmine.createSpyObj('LiveAnnouncer', ['announce']);
    component._liveAnnouncer = liveAnnouncer;
    component.announceSortChange(sortState);
    expect(liveAnnouncer.announce).toHaveBeenCalledWith('Sorting cleared');
  });
});