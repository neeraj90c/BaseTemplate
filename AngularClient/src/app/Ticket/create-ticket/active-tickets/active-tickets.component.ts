import { Component, Input } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { SupportTicketDTO } from 'src/app/interface/ticket.interface';

@Component({
  selector: 'app-active-tickets',
  templateUrl: './active-tickets.component.html',
  styleUrls: ['./active-tickets.component.scss']
})
export class ActiveTicketsComponent {
  constructor(private _ticketService: TicketService){}

  @Input() ticketData: SupportTicketDTO[] = [];

  public handleActionClick(event: { actionName: string, rowData: SupportTicketDTO }) {
    let { actionName, rowData } = event
    if (actionName === 'View') {
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }


}
