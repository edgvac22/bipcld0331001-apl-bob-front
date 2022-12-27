import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Issue } from 'src/app/models/issue';
import { IssueService } from 'src/app/services/issue/issue.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSolutionComponent } from '../../solution/add-solution/add-solution.component';

@Component({
  selector: 'app-list-isue',
  templateUrl: './list-isue.component.html',
  styleUrls: ['./list-isue.component.css']
})

export class ListIsueComponent implements OnInit {
  displayedColumns: string[] = ['area', 'environment', 'issueDetail', 'icons'];
  dataSource: MatTableDataSource<Issue>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private issueService: IssueService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listIssue();
  }

  listIssue() {
    this.issueService.listIssue().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}