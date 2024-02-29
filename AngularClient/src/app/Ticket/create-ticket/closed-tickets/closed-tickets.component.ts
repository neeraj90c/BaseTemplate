import { Component } from '@angular/core';
import { SupportTicketDTO } from 'src/app/interface/ticket.interface';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.scss']
})
export class ClosedTicketsComponent {
  constructor(private _ticketService: TicketService,private userService: UserService,) { }


  COMPANY_ID = environment.COMPANY_CODE
  User = this.userService.User()
  activeTickets: SupportTicketDTO[]=[];


  ngOnInit(): void {
    this.GetAllTicketData()
  
  }
  closedTickets:SupportTicketDTO[]=[]
  GetAllTicketData() {
    let data = { actionUser: this.User.userId, companyId: parseInt(this.COMPANY_ID) }
    this._ticketService.getClientUserTicketList(data).subscribe(res => {
      this.closedTickets = res.closedTickets
    })
  }

  public handleActionClick(event: { actionName: string, rowData: SupportTicketDTO }) {
    let { actionName, rowData } = event
    if (actionName === 'View') {
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }

}
