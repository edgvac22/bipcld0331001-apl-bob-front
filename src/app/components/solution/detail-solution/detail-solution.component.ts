import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'
import { SolutionService } from 'src/app/services/solution/solution.service';
import { SeeImageDetailComponent } from './see-image-detail/see-image-detail.component';

@Component({
  selector: 'app-detail-solution',
  templateUrl: './detail-solution.component.html',
  styleUrls: ['./detail-solution.component.css']
})
export class DetailSolutionComponent implements OnInit {

  solutionId: string;
  dataSource: any = {};

  constructor(
    private route: ActivatedRoute,
    private solutionService: SolutionService,
    private dialog: MatDialog
  ) {
    this.solutionId = this.route.snapshot.paramMap.get('solutionId')
  }

  ngOnInit(): void {
    this.solutionService.detailSolution(this.solutionId).subscribe((response: any) => {
      this.dataSource = response.data.Items[0];
    });
  }

  getImages(issueId: string) {
    this.solutionService.verifyCountObjectFile(issueId).subscribe(dataObject => {
      const total = dataObject.length + 1;
      if (total === 0) {
        this.dialog.open(SeeImageDetailComponent, {
          width: '450px',
          height: '150px',
          data: {
            issueId: issueId,
          }
        });
      } else {
        this.dialog.open(SeeImageDetailComponent, {
          width: '900px',
          height: '750px',
          data: {
            issueId: issueId,
            valid: true,
          }
        });
      }
    })
  }

}
