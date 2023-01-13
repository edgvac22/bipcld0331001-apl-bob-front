import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IssueService } from 'src/app/services/issue/issue.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { CreateSolution } from 'src/app/models/create-solution';
import { SeeImageIssueComponent } from 'src/app/shared/see-image-issue/see-image-issue.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-add-solution',
  templateUrl: './add-solution.component.html',
  styleUrls: ['./add-solution.component.css']
})
export class AddSolutionComponent implements OnInit {
  dataSource: any = [];
  srcResult: any;
  addSolutionForm: FormGroup;
  filename = '';
  fileLength: any;
  fileToUpload: File;
  msg: string;

  constructor(
    private issueService: IssueService,
    private dialogRef: MatDialogRef<AddSolutionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public solutionService: SolutionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.addSolutionForm = new FormGroup({
      solutionTitle: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      solutionDetail: new FormControl(null, [Validators.required, Validators.minLength(21)])
    });
    this.getInfo(this.data.issueId);
  }

  async getInfo(issueId: string) {
    this.issueService.getIssue(issueId).subscribe((response) => {
      this.dataSource = response;
    });
  }

  async openDialog(msg: string) {
    return {
      width: '250px',
      height: '150px',
      data: { msg }
    }
  }

  async addSolution(issueId: string) {
    if (!this.addSolutionForm.invalid) {
      const solutionTitle = this.addSolutionForm.get('solutionTitle')!.value
      const solutionDetail = this.addSolutionForm.get('solutionDetail')!.value

      const createSolution = {
        solutionUser: localStorage.getItem('email'),
        solutionTitle: solutionTitle,
        solutionDetail: solutionDetail
      }

      this.solutionService.addSolution(issueId, createSolution).subscribe(data => {
        this.msg = 'Solución creada exitosamente!';
        this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
      })
    }
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

  async close() {
    this.dialogRef.close()
  }

  async onFileSelected(event: any, issueId: string) {
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
            this.msg = data.msg;
            this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
          } else {
            this.fileLength = `No se han subido archivos`;
            this.msg = 'Solo se permiten archivos jpg o png.';
            this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
          }
        });
      } else {
        this.fileLength = `No se han subido archivos`;
        this.msg = 'Cantidad de archivos superior al limite.';
        this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
      }
    }
    )
  }
}