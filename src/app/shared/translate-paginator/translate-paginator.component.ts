import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-translate-paginator',
  templateUrl: './translate-paginator.component.html',
})
export class TranslatePaginatorComponent {
  decimalPipe = new DecimalPipe(navigator.language);

  constructor() {}

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'Primera página';
    paginator._intl.itemsPerPageLabel = 'Registros por página';
    paginator._intl.lastPageLabel = 'Última página';
    paginator._intl.nextPageLabel = 'Siguiente página';
    paginator._intl.previousPageLabel = 'Página anterior';
  }

}
