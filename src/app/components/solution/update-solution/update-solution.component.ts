import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateSolution } from 'src/app/models/update-solution';
import { IssueService } from 'src/app/services/issue/issue.service';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { SeeImageSolutionComponent } from './see-image-solution/see-image-solution.component';

@Component({
  selector: 'app-update-solution',
  templateUrl: './update-solution.component.html',
  styleUrls: ['./update-solution.component.css']
})
export class UpdateSolutionComponent implements OnInit {
  dataSource: any = [];
  srcResult: any;
  solution: UpdateSolution[];
  updateSolut = new UpdateSolution();
  fileLength: any;
  updateSolutionForm: FormGroup;
  dataImg: any = []

  constructor(
    private _activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private dialogRef: MatDialogRef<UpdateSolutionComponent>,
    private solutionService: SolutionService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.updateSolutionForm = new FormGroup({
      solutionUser: new FormControl(null),
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
    this.dialog.open(SeeImageSolutionComponent, {
      width: '1000px',
      height: '665px',
      data: {
        issueId: issueId
      }
    });
  }

  close() {
    this.dialogRef.close()
  }

  onFileSelected(event: any, issueId: string) {
    const files = event.target.files;
    this.fileLength = `${files.length} archivos subidos`;

    if (files.length === 1) {
      this.fileLength = `${this.fileLength} archivo subido`;
    }

    this.solutionService.verifyCountObjectFile(issueId).subscribe(dataObject => {
      const lengthObjectPermitted = 10 - dataObject.length;
      if (files.length < lengthObjectPermitted) {
        this.solutionService.uploadSolutionFile(files, issueId).subscribe((data: any) => {
          if (data.msg === 'Los archivos se han sido subido exitosamente' && data.length > 0) {
            alert(data.msg);
          } else {
            alert("Solo se permiten archivos jpg o png.");
            this.fileLength = `No se han subido archivos`;
          }
        });
      } else {
        alert('Cantidad de archivos superior al limite.');
        this.fileLength = `No se han subido archivos`;
      }
    });
  }

  async updateSolution(issueId: string) {
    if (this.updateSolut.solutionDetail === undefined) {
      this.updateSolut.solutionDetail = this.dataSource.solutionDetail;
    }

    if (this.updateSolut.solutionTitle === undefined) {
      this.updateSolut.solutionTitle = this.dataSource.solutionTitle;
    }

    if (this.updateSolut.solutionUser === undefined) {
      this.updateSolut.solutionUser = this.dataSource.solutionUser;
    }
    if (!this.updateSolutionForm.invalid) {
      this.solutionService.updateSolution(issueId, this.updateSolut).subscribe(data => {
        console.log(data);
        alert(`Solución actualizada exitosamente!`);
        this.dialogRef.close()
        this.router.navigate(['/solution/list']);
      })
    }
  }
}
