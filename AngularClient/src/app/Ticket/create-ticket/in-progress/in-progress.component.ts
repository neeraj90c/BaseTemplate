import { Component } from '@angular/core';
import { SupportTicketDTO } from 'src/app/interface/ticket.interface';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { TicketService } from '../../ticket.service'

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent {
  constructor(private _ticketService: TicketService,private userService: UserService,) { }


  User = this.userService.User()
  inprogressTickets: SupportTicketDTO[]=[];


  ngOnInit(): void {
    this.GetAllTicketData()
  
  }

  GetAllTicketData() {
    let data = { actionUser: this.User.userId, companyId: parseInt(this.User.companyId) }
    this._ticketService.getClientUserTicketList(data).subscribe(res => {
      this.inprogressTickets = res.inprogressTickets
    })
  }

  public handleActionClick(event: { actionName: string, rowData: SupportTicketDTO }) {
    let { actionName, rowData } = event
    if (actionName === 'View') {
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }

}
