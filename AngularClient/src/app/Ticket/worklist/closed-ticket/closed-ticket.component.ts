import { Component } from '@angular/core';
import { SupportTicketDTO, GetClientListDTO } from '../../interface/ticket.interface';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-closed-ticket',
  templateUrl: './closed-ticket.component.html',
  styleUrls: ['./closed-ticket.component.scss']
})
export class ClosedTicketComponent {

  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  ClosedTickets: SupportTicketDTO[] = []

  constructor(private _ticketService: TicketService) { }

  ngOnInit(): void {

    let data: GetClientListDTO = {
      actionUser: 1,
      companyId: 1,
      startDate: this.firstDayOfMonth,
      endDate: this.today
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.ClosedTickets = res.closedTickets
    })
  }

  

  public handleActionClick(event:{ actionName:string, rowData: SupportTicketDTO}) {
    let { actionName, rowData} = event
    if(actionName === 'View'){
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }
}
