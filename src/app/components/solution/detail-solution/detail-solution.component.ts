import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'
import { UserRoleService } from 'src/app/services/role/user-role.service';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SeeImageDetailComponent } from './see-image-detail/see-image-detail.component';

@Component({
  selector: 'app-detail-solution',
  templateUrl: './detail-solution.component.html',
  styleUrls: ['./detail-solution.component.css']
})
export class DetailSolutionComponent implements OnInit {

  solutionId: string;
  dataSource: any = {};
  msg: string;

  constructor(
    private route: ActivatedRoute,
    public solutionService: SolutionService,
    public dialog: MatDialog,
    public userRoleService: UserRoleService,
  ) {
    this.solutionId = this.route.snapshot.paramMap.get('solutionId')
  }

  async ngOnInit(): Promise<void> {
    this.userRoleService.getGroups();
    this.getInfo();
  }

  getInfo() {
    this.solutionService.detailSolution(this.solutionId).subscribe((response: any) => {
      this.dataSource = response;
    });
  }

  async openDialog(msg: string) {
    return {
      width: '250px',
      height: '150px',
      data: { msg },
    }
  }

  getImages(issueId: string) {
    this.solutionService.verifyCountObjectFile(issueId).subscribe(dataObject => {
      if (dataObject.length >= 0) {
        this.dialog.open(SeeImageDetailComponent, {
          width: '900px',
          height: '700px',
          data: {
            issueId: issueId,
            valid: true,
          }
        });
      } else {
        this.msg = 'Esta Solución no tiene archivos agregados.'
        this.openDialog(this.msg).then((config) =>
          this.dialog.open(DialogComponent, config),
        )
      }
    })
  }
}
