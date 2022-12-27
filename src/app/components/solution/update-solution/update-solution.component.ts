import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateSolution } from 'src/app/models/update-solution';
import { IssueService } from 'src/app/services/issue/issue.service';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SeeImageIssueComponent } from 'src/app/shared/see-image-issue/see-image-issue.component';
import { SeeImageSolutionComponent } from './see-image-solution/see-image-solution.component';

@Component({
  selector: 'app-update-solution',
  templateUrl: './update-solution.component.html',
  styleUrls: ['./update-solution.component.css']
})
export class UpdateSolutionComponent implements OnInit {
  dataSource: any = [];
  srcResult: any;
  fileLength: any;
  updateSolutionForm: FormGroup;
  dataImg: any = [];
  msg: string;

  constructor(
    private issueService: IssueService,
    private dialogRef: MatDialogRef<UpdateSolutionComponent>,
    private solutionService: SolutionService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.updateSolutionForm = new FormGroup({
      solutionTitle: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      solutionDetail: new FormControl(null, [Validators.required, Validators.minLength(21)])
    });
    this.getInfo(this.data.issueId);
  }

  getInfo(issueId: string) {
    this.issueService.getIssue(issueId).subscribe((response) => {
      this.dataSource = response;
    });
  }

  getImages(issueId: string) {
    this.solutionService.verifyCountObjectFile(issueId).subscribe(dataObject => {
      const total = dataObject.length + 1;
      if (total === 0) {
        this.dialog.open(SeeImageSolutionComponent, {
          width: '450px',
          height: '150px',
          data: {
            issueId: issueId,
          }
        });
      } else {
        this.dialog.open(SeeImageSolutionComponent, {
          width: '1000px',
          height: '750px',
          data: {
            issueId: issueId,
            valid: true,
          }
        });
      }
    })
  }

  getImageIssue(fileId: string) {
    if (fileId === undefined) {
      this.msg = 'No hay archivos agregados para este Hallazgo.';
      this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
    } else {
      this.dialog.open(SeeImageIssueComponent, {
        width: '1000px',
        height: '750px',
        data: {
          fileId: fileId
        }
      });
    }
  }

  close() {
    this.dialogRef.close()
  }

  async openDialog(msg: string) {
    return {
      width: '250px',
      height: '150px',
      data: { msg }
    }
  }

  async updateSolution(issueId: string) {
    if (!this.updateSolutionForm.invalid) {
      const solutionTitle = this.updateSolutionForm.get('solutionTitle')?.value
      const solutionDetail = this.updateSolutionForm.get('solutionDetail')?.value

      const updateSolution = {
        solutionUser: localStorage.getItem('email'),
        solutionTitle: solutionTitle,
        solutionDetail: solutionDetail
      }

      this.solutionService.updateSolution(issueId, updateSolution).subscribe(data => {
        this.msg = 'Solución actualizada exitosamente!';
        this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
      })
    }
  }
}
