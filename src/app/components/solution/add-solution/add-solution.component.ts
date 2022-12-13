import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IssueService } from 'src/app/services/issue/issue.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-solution',
  templateUrl: './add-solution.component.html',
  styleUrls: ['./add-solution.component.css']
})
export class AddSolutionComponent implements OnInit {
  dataSource: any = [];
  srcResult: any;
  addSolutionForm: FormGroup;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private dialogRef: MatDialogRef<AddSolutionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.addSolutionForm = new FormGroup({
      solutionUser: new FormControl(null, [Validators.required]),
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

  addSolution() {
    if (this.addSolutionForm.invalid) {
      console.log("algo paso!")
    } else {
      alert(`Solución creada exitosamente!`);
      this.dialogRef.close()
      this.router.navigate(['/solution/list']);
    }
  }

  close() {
    this.dialogRef.close()
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}