import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SalesleadService } from '../saleslead.service';
import { SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.scss']
})
export class DaybookComponent implements OnInit {


  constructor(private _userService: UserService, private _salesLeadService: SalesleadService) { }


  dataTableLoading: boolean = false;
  User = this._userService.User()
  FreshLeads : SalesLeadDTO[]=[]
  FollowUpLeads : SalesLeadDTO[]=[]

  ngOnInit(): void {
    this.getDaybookByUserId(this.User.userId)
  }

  getDaybookByUserId(id:number){
    this._salesLeadService.Daybook_ByUserId(id).subscribe(res => {
      this.FreshLeads = res.freshLeads
      this.FollowUpLeads = res.followUp
    })
  }




  handleActionClick($event: { actionName: string; rowData: any; }) {
    throw new Error('Method not implemented.');
  }
  handleRedirect($event: { rowData: any; }) {
    throw new Error('Method not implemented.');
  }

}
