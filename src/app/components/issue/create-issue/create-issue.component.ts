import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateIssue } from 'src/app/models/create-issue';
import { AreaService } from 'src/app/services/area/area.service';
import { EnvironmentService } from 'src/app/services/environment/environment.service';
import { IssueService } from 'src/app/services/issue/issue.service';

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
  
  constructor(
    private dialogRef: MatDialogRef<CreateIssueComponent>,
    private areaService: AreaService,
    private environmentService: EnvironmentService,
    private issueService: IssueService,
    private router: Router,
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

  async save() {
    if (!this.createIssueForm.invalid) {
      if (this.fileId === undefined) {
        this.createIssue = {
          area: this.createIssueForm.get('area').value,
          environment: this.createIssueForm.get('environment').value,
          issueDetail: this.createIssueForm.get('issueDetail').value,
          issueUser: localStorage.getItem('email'),
        }
        this.issueService.createIssue(this.createIssue).subscribe((response) => {
          alert("Su hallazgo ha sido creado exitosamente");
          this.dialogRef.close();
        })
      } else {
        this.createIssue = {
          area: this.createIssueForm.get('area').value,
          environment: this.createIssueForm.get('environment').value,
          issueDetail: this.createIssueForm.get('issueDetail').value,
          issueUser: localStorage.getItem('email'),
          fileId: this.fileId,
        }
        this.issueService.createIssue(this.createIssue).subscribe((response) => {
          alert("Su hallazgo ha sido creado exitosamente");
          this.dialogRef.close();
        })
      }
    }
  }

  async listArea() {
    this.areaService.listArea().subscribe((response) => {
      for (let element of response) {
        this.area.push(element.name);
      }
    })
  }

  async listEnvironment() {
    this.environmentService.listEnvironment().subscribe((response) => {
      for (let element of response) {
        this.environment.push(element.name);
      }
    })
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
