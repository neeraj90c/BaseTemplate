import { Component } from '@angular/core';

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.scss']
})
export class WorklistComponent {
  title = 'Work in progress'
  changeTitle(text:string) {
    this.title = text
  }

}
