import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SeeImageSolutionComponent } from './see-image-solution.component';

describe('UpdateSolutionComponent', () => {
  let component: SeeImageSolutionComponent;
  let fixture: ComponentFixture<SeeImageSolutionComponent>;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageSolutionComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: {} },  
        { provide: MAT_DIALOG_DATA, useValue: {}},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close dialog', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should work openDialog(msg: string)', () => {
    const msg = 'mensaje'
    component.openDialog(msg);
  });
});