import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailSolutionComponent } from './detail-solution.component';

describe('DetailSolutionComponent', () => {
  let component: DetailSolutionComponent;
  let fixture: ComponentFixture<DetailSolutionComponent>;
  let activatedRoute: ActivatedRoute;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSolutionComponent ],
      providers: [
        DetailSolutionComponent,
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
