import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionService } from 'src/app/services/solution/solution.service';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-see-image-detail',
  templateUrl: './see-image-detail.component.html',
  styleUrls: ['./see-image-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SeeImageDetailComponent implements OnInit {
  thumbsSwiper: any;
  slides: any = [];
  fileLength: any;
  msg: string;
  valid: false;

  constructor(
    private solutionService: SolutionService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SeeImageDetailComponent>,
  ) { }

  async ngOnInit(): Promise<void> {
    this.solutionService.getImageFiles(this.data.issueId).subscribe((response) => {
      this.slides = response;
    });
    if(this.data.valid === true) {
      this.valid = this.data.valid;
    } 
  }

  close() {
    this.dialogRef.close();
  }

  async openDialog(msg: string) {
    return {
      width: '250px',
      height: '150px',
      data: { msg }
    }
  }
}
