import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  reload() {
    if (this.data.msg === '¡Su solución ha sido creada exitosamente!' || this.data.msg === '¡Su solución ha sido actualizada exitosamente!'
      || this.data.msg === '¡Los archivos se han sido subido exitosamente!' || this.data.msg === 'Su hallazgo ha sido creado exitosamente') { 
      location.reload();
    }
  }
}
