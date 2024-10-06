import { Component } from '@angular/core';
import { SupportTicketDTO } from 'src/app/interface/ticket.interface';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { TicketService } from '../../ticket.service';
import { GetTicketByUserIdDTO } from '../../ticketPaginated.interface';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.scss']
})
export class ClosedTicketsComponent {
  constructor(private _ticketService: TicketService,private userService: UserService,) { }


  User = this.userService.User()
  activeTickets: SupportTicketDTO[]=[];


  ngOnInit(): void {
    this.GetAllTicketData()
  
  }
  closedTickets:SupportTicketDTO[]=[]
  GetAllTicketData() {
    let data = { actionUser: this.User.userId, companyId: parseInt(this.User.companyId) }
    this._ticketService.getClientUserTicketList(data).subscribe(res => {
      this.closedTickets = res.closedTickets
    })

    let ticketData :GetTicketByUserIdDTO = {
      actionUser: this.User.userId.toString(),
      companyId: parseInt(this.User.companyId),
      PageSize: 10,
      PageNo: 1,
      Status: 'Closed',
      OrderBy: '',
      SearchByTitle: ''
    }
    this._ticketService.getClientUserTicketListPaginated(ticketData).subscribe(res => {
      this.closedTickets = res.tickets
    })
  }

  public handleActionClick(event: { actionName: string, rowData: SupportTicketDTO }) {
    let { actionName, rowData } = event
    if (actionName === 'View') {
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }

}
