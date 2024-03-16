import { Component } from '@angular/core';

@Component({
  selector: 'app-lead-worklist',
  templateUrl: './lead-worklist.component.html',
  styleUrls: ['./lead-worklist.component.scss']
})
export class LeadWorklistComponent {
  title = 'Work in progress'
  changeTitle(text:string) {
    this.title = text
  }

}
