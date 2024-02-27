import { Component } from '@angular/core';
import { SupportTicketDTO, GetClientListDTO } from '../../../interface/ticket.interface';
import { TicketService } from '../../ticket.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-open-ticket',
  templateUrl: './open-ticket.component.html',
  styleUrls: ['./open-ticket.component.scss']
})
export class OpenTicketComponent {
  COMPANY_ID = parseInt(environment.COMPANY_CODE)
  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  OpenTickets: SupportTicketDTO[] = []

  constructor(private _ticketService: TicketService,private userService:UserService) { }
  User = this.userService.User()
  ngOnInit(): void {

    let data: GetClientListDTO = {
      actionUser: this.User.userId,
      companyId: this.COMPANY_ID,
      startDate: this.firstDayOfMonth,
      endDate: this.today
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.OpenTickets = res.openTickets
    })
  }

  
  public handleActionClick(event:{ actionName:string, rowData: SupportTicketDTO}) {
    let { actionName, rowData} = event
    if(actionName === 'View'){
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }
}
