import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SeeImageDetailComponent } from './see-image-detail.component';

describe('SeeImageDetailComponent', () => {
  let component: SeeImageDetailComponent;
  let fixture: ComponentFixture<SeeImageDetailComponent>;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageDetailComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRefSpy },
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
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

  it('should close the dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });
});