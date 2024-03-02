import { Component } from '@angular/core';
import { SupportTicketDTO, GetClientListDTO } from '../../../interface/ticket.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-closed-ticket',
  templateUrl: './closed-ticket.component.html',
  styleUrls: ['./closed-ticket.component.scss']
})
export class ClosedTicketComponent {
  //COMPANY_ID = parseInt(environment.COMPANY_CODE)

  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  ClosedTickets: SupportTicketDTO[] = []

  constructor(private _ticketService: TicketService,private userService:UserService) { }
   dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  })
  User = this.userService.User()
  ngOnInit(): void {


    let data: GetClientListDTO = {
      actionUser: this.User.userId,
      companyId: parseInt(this.User.companyId),
      startDate: this.firstDayOfMonth,
      endDate: this.today
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.ClosedTickets = res.closedTickets
    })
    this.dateForm.patchValue({
      startDate:formatDate(this.firstDayOfMonth,'yyyy-MM-dd','en'),
      endDate:formatDate(this.today,'yyyy-MM-dd','en')
    })
    console.log(this.dateForm.value);
    
  }

  

  public handleActionClick(event:{ actionName:string, rowData: SupportTicketDTO}) {
    let { actionName, rowData} = event
    if(actionName === 'View'){
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }

  LoadDataWithDate(){
    console.log(this.dateForm.value);
    let data: GetClientListDTO = {
      actionUser: this.User.userId,
      companyId: parseInt(this.User.companyId),
      startDate: this.dateForm.controls.startDate.value as Date,
      endDate: this.dateForm.controls.endDate.value as Date
    };

    this._ticketService.getClientWorklist(data).subscribe(res => {
      this.ClosedTickets = res.closedTickets
    })
    
  }
}
