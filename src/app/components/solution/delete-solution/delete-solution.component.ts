import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionService } from '../../../services/solution/solution.service'

@Component({
  selector: 'app-delete-solution',
  templateUrl: './delete-solution.component.html',
  styleUrls: ['./delete-solution.component.css']
})
export class DeleteSolutionComponent {

  constructor(
    private solutionService: SolutionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

    delete() {
      this.solutionService.removeSolution(this.data.issueId).subscribe((response) => {
        location.reload();
      });
    }

}
