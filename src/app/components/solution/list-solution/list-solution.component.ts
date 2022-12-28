import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Solution } from 'src/app/models/solution';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { DeleteSolutionComponent } from '../delete-solution/delete-solution.component';
import { UpdateSolutionComponent } from '../update-solution/update-solution.component';

@Component({
  selector: 'app-list-solution',
  templateUrl: './list-solution.component.html',
  styleUrls: ['./list-solution.component.css']
})
export class ListSolutionComponent implements OnInit {
  displayedColumns: string[] = ['title', 'area', 'environment', 'icons'];
  dataSource = new MatTableDataSource<Solution>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private solutionService: SolutionService, private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.listSolution();
  }

  listSolution() {
    this.solutionService.listSolution().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filterWords = filterValue.split(' ');
    this.dataSource.filterPredicate = (data) => {
      const solutionTitle = data.solutionTitle.toString().toLowerCase();
      const solutionDetail = data.solutionDetail.toString().toLowerCase();
      const area = data.area.toString().toLowerCase();
      const environment = data.environment.toString().toLowerCase();
      return filterWords.every(word => solutionTitle.includes(word) || solutionDetail.includes(word)
        || area.indexOf(filterValue) !== -1 || environment.indexOf(filterValue) !== -1);
    };
    this.dataSource.filter = filterValue;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  updateSolution(issueId: string): void {
    this.dialog.open(UpdateSolutionComponent, {
      width: '800px',
      height: '715px',
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