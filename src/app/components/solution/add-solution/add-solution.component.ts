import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-add-solution',
  templateUrl: './add-solution.component.html',
  styleUrls: ['./add-solution.component.css']
})
export class AddSolutionComponent implements OnInit {
  dataSource: any = [];
  srcResult: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private dialogRef: MatDialogRef<AddSolutionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.getInfo(this.data.issueId);
  }

  getInfo(issueId: string) {
    this.issueService.getIssue(issueId).subscribe((response) => {
      this.dataSource = response;
    });
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