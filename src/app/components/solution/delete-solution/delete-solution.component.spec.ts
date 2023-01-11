import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionService } from 'src/app/services/solution/solution.service';

import { DeleteSolutionComponent } from './delete-solution.component';

describe('DeleteSolutionComponent', () => {
  let component: DeleteSolutionComponent;
  let fixture: ComponentFixture<DeleteSolutionComponent>;
  let service: SolutionService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolutionService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSolutionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SolutionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("reload page when delete is successfull", () => {
    component.delete();
});
});