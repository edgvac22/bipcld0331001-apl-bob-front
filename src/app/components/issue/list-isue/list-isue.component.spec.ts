import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIsueComponent } from './list-isue.component';

describe('ListIsueComponent', () => {
  let component: ListIsueComponent;
  let fixture: ComponentFixture<ListIsueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIsueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIsueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
