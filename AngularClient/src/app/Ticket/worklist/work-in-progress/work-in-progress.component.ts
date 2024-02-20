import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { GetClientListDTO, SupportTicketDTO } from '../../interface/ticket.interface';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss']
})
export class WorkInProgressComponent implements OnInit {
  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  WorkInProgress: SupportTicketDTO[] = []

  constructor(private _ticketService: TicketService) { }

  ngOnInit(): void {

    let data: GetClientListDTO = {
      actionUser: 1,
      companyId: 1,
      startDate: this.firstDayOfMonth,
      endDate: this.today
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.WorkInProgress = res.workInProgress
    })
  }

  

  public handleActionClick(event:any){
    console.log(event);
  }

}
