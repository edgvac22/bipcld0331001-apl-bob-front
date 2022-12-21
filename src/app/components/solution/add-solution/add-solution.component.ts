import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IssueService } from 'src/app/services/issue/issue.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { CreateSolution } from 'src/app/models/create-solution';

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
  solution: CreateSolution[];
  createSolution = new CreateSolution();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private dialogRef: MatDialogRef<AddSolutionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
    private solutionService: SolutionService,
  ) { }

  ngOnInit(): void {
    this.addSolutionForm = new FormGroup({
      solutionUser: new FormControl(null, [Validators.required]),
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

  async addSolution(issueId: string) {
    if (!this.addSolutionForm.invalid) {
      this.solutionService.addSolution(issueId, this.createSolution).subscribe(data => {
        alert(`Solución creada exitosamente!`);
        this.dialogRef.close()
        this.router.navigate(['/solution/list']);
      })
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

    if (files.length < 11) {
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
  }
}