import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  reload() {
    if (this.data.msg === 'Solución creada exitosamente!' || this.data.msg === 'Solución actualizada exitosamente!'
      || this.data.msg === '¡Los archivos se han sido subido exitosamente!') {
      location.reload();
    }
  }
}
