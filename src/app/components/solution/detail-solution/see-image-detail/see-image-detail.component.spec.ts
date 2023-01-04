import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeImageDetailComponent } from './see-image-detail.component';

describe('SeeImageDetailComponent', () => {
  let component: SeeImageDetailComponent;
  let fixture: ComponentFixture<SeeImageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
