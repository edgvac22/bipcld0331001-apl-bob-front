import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeeImageIssueComponent } from './see-image-issue.component';

describe('SeeImageIssueComponent', () => {
  let component: SeeImageIssueComponent;
  let fixture: ComponentFixture<SeeImageIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeImageIssueComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeImageIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
