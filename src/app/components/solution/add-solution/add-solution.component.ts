import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/models/issue';
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-add-solution',
  templateUrl: './add-solution.component.html',
  styleUrls: ['./add-solution.component.css']
})
export class AddSolutionComponent implements OnInit {
  dataSource = [];
  
  constructor(private _activatedRoute: ActivatedRoute, private issueService: IssueService) { 
  }

  ngOnInit(): void {
      const issueId = this._activatedRoute.snapshot.paramMap.get('issueId');
      this.getInfo(issueId);
  }

  getInfo(issueId: any) {
    this.issueService.getIssue(issueId).subscribe((response) => {
      this.dataSource = response;
    });
  }

}
