import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateIssue } from 'src/app/models/create-issue';
import { AreaService } from 'src/app/services/area/area.service';
import { EnvironmentService } from 'src/app/services/environment/environment.service';
import { IssueService } from 'src/app/services/issue/issue.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
  createIssueForm: FormGroup;
  area: any = [];
  environment: any = [];
  createIssue = new CreateIssue();
  fileLength: any;
  fileId: string;
  msg: string;

  constructor(
    private dialogRef: MatDialogRef<CreateIssueComponent>,
    private areaService: AreaService,
    private environmentService: EnvironmentService,
    private issueService: IssueService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listArea();
    this.listEnvironment();
    this.createIssueForm = new FormGroup({
      area: new FormControl(null, [Validators.required]),
      environment: new FormControl(null, [Validators.required]),
      issueDetail: new FormControl(null, [Validators.required, Validators.minLength(21)])
    });
  }

  async close() {
    this.dialogRef.close();
  }

  async openDialog(msg: string) {
    return {
      width: '250px',
      height: '150px',
      data: { msg }
    }
  }

  async save() {
    if (!this.createIssueForm.invalid) {
      if (this.fileId === undefined) {
        this.createIssue = {
          area: this.createIssueForm.get('area').value,
          environment: this.createIssueForm.get('environment').value,
          issueDetail: this.createIssueForm.get('issueDetail').value,
          issueUser: localStorage.getItem('email'),
        }
        this.issueService.createIssue(this.createIssue).subscribe(() => {
          this.msg = 'Su hallazgo ha sido creado exitosamente';
          this.openDialog(this.msg).then(config => this.dialog.open(DialogComponent, config));
        })
      } else {
        this.createIssue = {
          area: this.createIssueForm.get('area').value,
          environment: this.createIssueForm.get('environment').value,
          issueDetail: this.createIssueForm.get('issueDetail').value,
          issueUser: localStorage.getItem('email'),
          fileId: this.fileId,
        }
        this.issueService.createIssue(this.createIssue).subscribe(() => {
          alert("Su hallazgo ha sido creado exitosamente");
          this.dialogRef.close();
        })
      }
    }
  }

  async listArea() {
    if (localStorage.getItem('area')) {
      this.area = JSON.parse(localStorage.getItem('area'));
    } else {
      this.areaService.listArea().subscribe((response) => {
        for (let element of response) {
          this.area.push(element.name);
        }
        localStorage.setItem('area', JSON.stringify(this.area));
      })
    }
  }

  async listEnvironment() {
    if (localStorage.getItem('environment')) {
      this.environment = JSON.parse(localStorage.getItem('environment'));
    } else {
      this.environmentService.listEnvironment().subscribe((response) => {
        for (let element of response) {
          this.environment.push(element.name);
        }
        localStorage.setItem('environment', JSON.stringify(this.environment));
      })
    }
  }

  async onFileSelected(event: any) {
    const files = event.target.files;
    this.fileLength = `${files.length} archivos subidos`;

    if (files.length === 1) {
      this.fileLength = `${this.fileLength} archivo subido`;
    }

    if (files.length < 6) {
      this.issueService.uploadFile(files).subscribe((data: any) => {
        if (data.msg === 'Los archivos se han sido subido exitosamente' && data.length > 0) {
          this.fileId = data.idFile;
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
  }
}
