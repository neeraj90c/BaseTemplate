import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { GetClientListDTO, SupportTicketDTO } from '../../../interface/ticket.interface';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss']
})
export class WorkInProgressComponent implements OnInit {
  COMPANY_ID = parseInt(environment.COMPANY_CODE)
  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  WorkInProgress: SupportTicketDTO[] = []

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
      this.WorkInProgress = res.workInProgress
    })
  }

  

  public handleActionClick(event:any){
    console.log(event);
  }

}
