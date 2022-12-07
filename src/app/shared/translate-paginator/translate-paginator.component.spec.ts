import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatePaginatorComponent } from './translate-paginator.component';

describe('TranslatePaginatorComponent', () => {
  let component: TranslatePaginatorComponent;
  let fixture: ComponentFixture<TranslatePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatePaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
