import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePaginatorComponent } from './translate-paginator.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

describe('TranslatePaginatorComponent', () => {
  let component: TranslatePaginatorComponent;
  let fixture: ComponentFixture<TranslatePaginatorComponent>;
  let paginator: MatPaginator;
  let intl: MatPaginatorIntl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslatePaginatorComponent],
      providers: [MatPaginatorIntl]
    });

    intl = TestBed.inject(MatPaginatorIntl);
    paginator = new MatPaginator(intl, null);

    fixture = TestBed.createComponent(TranslatePaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should translate MatPaginator', () => {
    component.translateMatPaginator(paginator);
    expect(paginator._intl.firstPageLabel).toEqual('Primera página');
    expect(paginator._intl.itemsPerPageLabel).toEqual('Registros por página');
    expect(paginator._intl.lastPageLabel).toEqual('Última página');
    expect(paginator._intl.nextPageLabel).toEqual('Siguiente página');
    expect(paginator._intl.previousPageLabel).toEqual('Página anterior');
  });
});