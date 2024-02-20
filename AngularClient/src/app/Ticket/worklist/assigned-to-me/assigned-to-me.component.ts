import { Component } from '@angular/core';
import { GetClientListDTO, SupportTicketDTO } from '../../interface/ticket.interface';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.scss']
})
export class AssignedToMeComponent {
  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  AssignedToMe: SupportTicketDTO[] = []

  constructor(private _ticketService: TicketService) { }

  ngOnInit(): void {

    let data: GetClientListDTO = {
      actionUser: 1,
      companyId: 1,
      startDate: this.firstDayOfMonth,
      endDate: this.today
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.AssignedToMe = res.assignedToMe
    })
  }


  public handleActionClick(event:{ actionName:string, rowData: SupportTicketDTO}) {
    let { actionName, rowData} = event
    if(actionName === 'View'){
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }

}
