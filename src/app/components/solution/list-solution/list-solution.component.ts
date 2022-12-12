import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Solution } from 'src/app/models/solution';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { UpdateSolutionComponent } from '../update-solution/update-solution.component';

@Component({
  selector: 'app-list-solution',
  templateUrl: './list-solution.component.html',
  styleUrls: ['./list-solution.component.css']
})
export class ListSolutionComponent implements OnInit {

  displayedColumns: string[] = ['solutionId', 'title', 'area', 'environment', 'icons'];
  dataSource = new MatTableDataSource<Solution>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private solutionService: SolutionService, private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  ngOnInit(): void {
    this.listSolution();
  }

  listSolution() {
    this.solutionService.listSolution().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      height: '600px',
      data: {
        issueId: issueId
      }
    });
  }

  removeSolution(issueId: string, solutionId: string) {
    if (confirm(`¿Desea eliminar la solución #${solutionId}?`)) {
      this.solutionService.removeSolution(issueId).subscribe((response) => {
        console.log(response);
      });
    }
  }
}