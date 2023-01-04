import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-see-image-solution',
  templateUrl: './see-image-solution.component.html',
  styleUrls: ['./see-image-solution.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SeeImageSolutionComponent implements OnInit {
  thumbsSwiper: any;
  slides: any = [];
  fileLength: any;
  msg: string;
  valid: false;

  constructor(
    private solutionService: SolutionService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SeeImageSolutionComponent>,
    private dialog: MatDialog,
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

  onFileSelected(event: any) {
    const files = event.target.files;
    this.fileLength = `${files.length} archivos subidos`;

    if (files.length === 1) {
      this.fileLength = `${this.fileLength} archivo subido`;
    }

    this.solutionService.verifyCountObjectFile(this.data.issueId).subscribe(dataObject => {
      const lengthObjectPermitted = 10 - dataObject.length;
      if (files.length < lengthObjectPermitted) {
        this.solutionService.uploadSolutionFile(files, this.data.issueId).subscribe((data: any) => {
          if (data.msg === 'Los archivos se han sido subido exitosamente' && data.length > 0) {
            this.msg = '¡Los archivos se han sido subido exitosamente!'
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
    });
  }
}
