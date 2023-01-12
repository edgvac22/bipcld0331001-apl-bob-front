import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component'
import { InjectionToken } from '@angular/core'

export const WINDOW = new InjectionToken('Window')

describe('DialogComponent', () => {
  let component: DialogComponent
  let fixture: ComponentFixture<DialogComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent)
    component = fixture.componentInstance
    component = new DialogComponent('data');
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("reload page when if statements", () => {
    component.reload();
  });
})