import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Solution } from 'src/app/models/solution';
import { AreaService } from 'src/app/services/area/area.service';
import { EnvironmentService } from 'src/app/services/environment/environment.service';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { DeleteSolutionComponent } from '../delete-solution/delete-solution.component';
import { UpdateSolutionComponent } from '../update-solution/update-solution.component';

@Component({
  selector: 'app-list-solution',
  templateUrl: './list-solution.component.html',
  styleUrls: ['./list-solution.component.css']
})
export class ListSolutionComponent implements OnInit {
  area: any = [];
  environment: any = [];
  displayedColumns: string[] = ['title', 'area', 'environment', 'icons'];
  dataSource: any = new MatTableDataSource<Solution>();
  areaFilter = new FormControl();
  environmentFilter = new FormControl();
  solutionTitleFilter = new FormControl();
  filteredValues = { area: '', environment: '', solutionTitle: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private solutionService: SolutionService,
    public _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    public areaService: AreaService,
    public environmentService: EnvironmentService,
    ) { }

  ngOnInit(): void {
    this.solutionService.listSolution().subscribe((response) => {
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
  
      this.solutionTitleFilter.valueChanges.subscribe((solutionTitleFilterValue) => {
        this.filteredValues['solutionTitle'] = solutionTitleFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.listArea();
    this.listEnvironment();
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
    const myFilterPredicate = function(data: Solution, filter: string) : boolean {
      let searchString = JSON.parse(filter);
      let filterWords = searchString.solutionTitle.toLowerCase().split(' ');
      let solutionTitle = data.solutionTitle.toLowerCase();
      let solutionTitleFound = filterWords.every(word => solutionTitle.includes(word));
      let areaFound = data.area.toLowerCase().includes(searchString.area.toLowerCase());
      let environmentFound = data.environment.toLowerCase().includes(searchString.environment.toLowerCase());
      if (searchString.topFilter) {
          return solutionTitleFound || areaFound || environmentFound;
      } else {
          return solutionTitleFound && areaFound && environmentFound;
      }
    }
    return myFilterPredicate;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  resetFilter() {
    this.input.nativeElement.value = '';
    this.areaFilter.setValue('');
    this.environmentFilter.setValue('');
    this.dataSource.filter = '';
  }

  updateSolution(issueId: string): void {
    this.dialog.open(UpdateSolutionComponent, {
      width: '800px',
      height: '700px',
      data: {
        issueId: issueId
      }
    });
  }

  removeSolution(issueId: string, solutionId: string) {
    this.dialog.open(DeleteSolutionComponent, {
      width: '250px',
      height: '150px',
      data: {
        issueId: issueId,
        solutionId: solutionId
      }
    })
  }
}