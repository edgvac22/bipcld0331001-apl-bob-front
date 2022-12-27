import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeeImageSolutionComponent } from 'src/app/components/solution/update-solution/see-image-solution/see-image-solution.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SeeImageSolutionComponent>,
  ) { }

  reload() {
    if (this.data.msg === 'Solución creada exitosamente!' || this.data.msg === 'Solución actualizada exitosamente!') {
      location.reload();
    }
    if (this.data.msg === '¡Los archivos se han sido subido exitosamente!') {
      location.reload();
    }
  }
}
