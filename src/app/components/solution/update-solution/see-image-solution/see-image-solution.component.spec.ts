import { async, TestBed } from '@angular/core/testing';
import { SeeImageSolutionComponent } from './see-image-solution.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionService } from 'src/app/services/solution/solution.service';
import { of } from 'rxjs';

describe('SeeImageSolutionComponent', () => {
  let component: SeeImageSolutionComponent;
  let dialogRef: MatDialogRef<SeeImageSolutionComponent>;
  let solutionService: SolutionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: SolutionService, useValue: {
            getImageFiles: () => of([]),
            verifyCountObjectFile: () => of({ length: 0 }),
            uploadSolutionFile: () => of({ msg: '', length: 0 })
          }
        }
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on close()', () => {
    spyOn(dialogRef, 'close');
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });



  it('should get image files on ngOnInit()', () => {
    spyOn(solutionService, 'getImageFiles').and.returnValue(of([]));
    component.ngOnInit();
    expect(solutionService.getImageFiles).toHaveBeenCalled();
  });

  it('should verify the count of object files on onFileSelected()', () => {
    spyOn(solutionService, 'verifyCountObjectFile').and.returnValue(of({ length: 0 }));
    component.onFileSelected({ target: { files: [] }});
    expect(solutionService.verifyCountObjectFile).toHaveBeenCalled();
  });

  it('should upload solution files on onFileSelected()', () => {
    spyOn(solutionService, 'uploadSolutionFile').and.returnValue(of({ msg: '', length: 0 }));

    it('should display a message if files are successfully uploaded on onFileSelected()', () => {
      spyOn(component, 'openDialog');
      component.onFileSelected({ target: { files: [] }});
      expect(component.openDialog).toHaveBeenCalledWith('¡Los archivos se han sido subido exitosamente!');
    });
  
    it('should display a message if no files are uploaded on onFileSelected()', () => {
      spyOn(component, 'openDialog');
      component.fileLength = '';
      component.onFileSelected({ target: { files: [] }});
      expect(component.openDialog).toHaveBeenCalledWith('No se han subido archivos');
    });
  
    it('should display a message if the wrong file type is uploaded on onFileSelected()', () => {
      spyOn(solutionService, 'uploadSolutionFile').and.returnValue(of({ msg: 'Error', length: 0 }));
      spyOn(component, 'openDialog');
      component.onFileSelected({ target: { files: [] }});
      expect(component.openDialog).toHaveBeenCalledWith('Solo se permiten archivos jpg o png.');
    });
  
    it('should display a message if too many files are uploaded on onFileSelected()', () => {
      spyOn(solutionService, 'verifyCountObjectFile').and.returnValue(of({ length: 10 }));
      spyOn(component, 'openDialog');
      component.onFileSelected({ target: { files: [] }});
      expect(component.openDialog).toHaveBeenCalledWith('Cantidad de archivos superior al limite.');
    });
  });
});