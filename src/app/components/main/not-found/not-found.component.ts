import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  mailText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  contactIngSw() {
    this.mailText = 'https://teams.microsoft.com/l/team/19%3a46f7a7e79196484bb5e084703b179f3d%40thread.tacv2/conversations?groupId=6a7978f4-05d8-4dcc-8319-028e950855fe&tenantId=b5e244bd-c492-495b-8b10-61bfd453e423';
    window.open(
      this.mailText,
      '_blank'
    )
  }

}
