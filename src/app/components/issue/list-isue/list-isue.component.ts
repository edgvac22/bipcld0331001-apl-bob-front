import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Issue } from 'src/app/models/issue';
import { IssueService } from 'src/app/services/issue/issue.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSolutionComponent } from '../../solution/add-solution/add-solution.component';
import { AreaService } from 'src/app/services/area/area.service';
import { EnvironmentService } from 'src/app/services/environment/environment.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-isue',
  templateUrl: './list-isue.component.html',
  styleUrls: ['./list-isue.component.css']
})

export class ListIsueComponent implements OnInit {
  area: any = [];
  environment: any = [];
  displayedColumns: string[] = ['area', 'environment', 'issueDetail', 'icons'];
  dataSource: MatTableDataSource<Issue>;
  areaFilter = new FormControl();
  environmentFilter = new FormControl();
  issueDetailFilter = new FormControl();
  filteredValues = { area: '', environment: '', issueDetail: '' };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private issueService: IssueService,
    private dialog: MatDialog,
    public areaService: AreaService,
    public environmentService: EnvironmentService,
  ) { }

  ngOnInit(): void {
    this.issueService.listIssue().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      this.areaFilter.valueChanges.subscribe((areaFilterValue) => {
        this.filteredValues['area'] = areaFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
  
      this.environmentFilter.valueChanges.subscribe((environmentFilterValue) => {
        this.filteredValues['environment'] = environmentFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
  
      this.issueDetailFilter.valueChanges.subscribe((issueDetailFilterValue) => {
        this.filteredValues['issueDetail'] = issueDetailFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.listArea();
    this.listEnvironment();
  }
  
  resetFilter() {
    this.input.nativeElement.value = '';
    this.areaFilter.setValue('');
    this.environmentFilter.setValue('');
    this.dataSource.filter = '';
  }

  createSolution(issueId: string): void {
    this.dialog.open(AddSolutionComponent, {
      width: '800px',
      height: '650px',
      data: {
        issueId: issueId
      }
    });
  }

  async listArea() {
    if (localStorage.getItem('area')) {
      this.area = JSON.parse(localStorage.getItem('area'));
    } else {
      this.areaService.listArea().subscribe((response: any) => {
        for (let element of response) {
          this.area.push(element.name);
        }
        localStorage.setItem('area', JSON.stringify(this.area));
      })
    }
  }

  async listEnvironment() {
    if (localStorage.getItem('environment')) {
      this.environment = JSON.parse(localStorage.getItem('environment'));
    } else {
      this.environmentService.listEnvironment().subscribe((response) => {
        for (let element of response) {
          this.environment.push(element.name);
        }
        localStorage.setItem('environment', JSON.stringify(this.environment));
      })
    }
  }

  customFilterPredicate() {
    const myFilterPredicate = function(data: Issue, filter: string) : boolean {
      let searchString = JSON.parse(filter);
      let filterWords = searchString.issueDetail.toLowerCase().split(' ');
      let issueDetail = data.issueDetail.toLowerCase();
      let issueDetailFound = filterWords.every(word => issueDetail.includes(word));
      let areaFound = data.area.toLowerCase().includes(searchString.area.toLowerCase());
      let environmentFound = data.environment.toLowerCase().includes(searchString.environment.toLowerCase());
      if (searchString.topFilter) {
          return issueDetailFound || areaFound || environmentFound;
      } else {
          return issueDetailFound && areaFound && environmentFound;
      }
    }
    return myFilterPredicate;
  }
}