import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Issue } from 'src/app/models/issue';
import { IssueService } from 'src/app/services/issue/issue.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-isue',
  templateUrl: './list-isue.component.html',
  styleUrls: ['./list-isue.component.css']
})

export class ListIsueComponent implements OnInit {
  displayedColumns: string[] = ['issueId', 'area', 'environment', 'issueDetail'];
  dataSource = new MatTableDataSource<Issue>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private issueService: IssueService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  ngOnInit(): void {
    this.listIssue();
  }

  listIssue() {
    this.issueService.listIssue().subscribe((response) => {
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
}