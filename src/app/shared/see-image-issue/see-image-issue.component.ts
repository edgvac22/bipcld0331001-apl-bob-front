import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IssueService } from 'src/app/services/issue/issue.service';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-see-image-issue',
  templateUrl: './see-image-issue.component.html',
  styleUrls: ['./see-image-issue.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SeeImageIssueComponent implements OnInit {
  thumbsSwiper: any;
  slides: any = [];
  fileLength: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SeeImageIssueComponent>,
    private issueService: IssueService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.issueService.getImageFiles(this.data.fileId).subscribe((response) => {
      this.slides = response.fileUrls;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
