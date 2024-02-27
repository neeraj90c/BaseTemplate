import { Component } from '@angular/core';
import { SupportTicketDTO, GetClientListDTO } from '../../interface/ticket.interface';
import { TicketService } from '../../ticket.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assigned-to-others',
  templateUrl: './assigned-to-others.component.html',
  styleUrls: ['./assigned-to-others.component.scss']
})
export class AssignedToOthersComponent {
  COMPANY_ID = parseInt(environment.COMPANY_CODE)

  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  AssignedToOthers: SupportTicketDTO[] = []

  constructor(private _ticketService: TicketService, private userService:UserService) { }

  User = this.userService.User()
  ngOnInit(): void {

    let data: GetClientListDTO = {
      actionUser: this.User.userId,
      companyId: this.COMPANY_ID,
      startDate: this.firstDayOfMonth,
      endDate: this.today
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.AssignedToOthers = res.assignedToOthers
    })
  }
  

  public handleActionClick(event:{ actionName:string, rowData: SupportTicketDTO}) {
    let { actionName, rowData} = event
    if(actionName === 'View'){
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }
}
