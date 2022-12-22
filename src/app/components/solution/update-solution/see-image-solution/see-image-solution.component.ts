import { Component, Inject, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SolutionService } from 'src/app/services/solution/solution.service';
import SwiperCore, { Navigation, Swiper } from "swiper";
import { UpdateSolutionComponent } from '../update-solution.component';

// install Swiper modules
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-see-image-solution',
  templateUrl: './see-image-solution.component.html',
  styleUrls: ['./see-image-solution.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SeeImageSolutionComponent implements OnInit, AfterViewInit {
  thumbsSwiper: any;
  slides: any = [];
  fileLength: any;
  imagen = '../../../../../assets/img/background/back-1.png';

  @ViewChild('galleryTop') galleryTopElement: ElementRef;
  @ViewChild('galleryThumbs') galleryThumbsElement: ElementRef;

  galleryTop: Swiper;
  galleryThumbs: Swiper;

  constructor(
    private solutionService: SolutionService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SeeImageSolutionComponent>,
    private dialogRefUpdateSolution: MatDialogRef<UpdateSolutionComponent>,
    private router: Router,

  ) { }

  async ngOnInit(): Promise<void> {
    this.solutionService.getImageFiles(this.data.issueId).subscribe((response) => {
      this.slides = response;
    });
  }


  ngAfterViewInit() {
    
  }

  close() {
    this.dialogRef.close();
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
            alert(data.msg);
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.dialogRef.close();

              this.router.navigate(['/solution/list']);
            });
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
}
