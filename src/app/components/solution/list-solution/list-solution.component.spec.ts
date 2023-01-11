import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListSolutionComponent } from './list-solution.component';

describe('ListSolutionComponent', () => {
  let component: ListSolutionComponent;
  let fixture: ComponentFixture<ListSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSolutionComponent ],
      imports: [ MatDialogModule, HttpClientTestingModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolutionComponent);
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

  it('should reset filter', () => {
    component.resetFilter();
    expect(component.input.nativeElement.value).toEqual('');
    expect(component.areaFilter.value).toEqual('');
    expect(component.environmentFilter.value).toEqual('');
    expect(component.dataSource.filter).toEqual('');
  });

  it('should update solution', () => {
    component.updateSolution('issueId');
  });

  it('should remove solution', () => {
    component.removeSolution('issueId', 'solutionId');
  });
});