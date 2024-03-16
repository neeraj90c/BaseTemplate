import { Component, OnInit } from '@angular/core';
import { SalesleadService } from '../../saleslead.service';
import { CommonService } from 'src/app/Common/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-leads',
  templateUrl: './active-leads.component.html',
  styleUrls: ['./active-leads.component.scss']
})
export class ActiveLeadsComponent implements OnInit {

  today: Date;
  startDate: Date;
  nextFollowUpDate: Date;
  dataTableLoading = false
  constructor(private _salesleadService: SalesleadService, private _userService: UserService, private loaderService: LoaderService,private router:Router) {
    this.today = new Date();
    this.startDate = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));
    this.nextFollowUpDate = new Date(this.today);
    this.nextFollowUpDate.setDate(this.today.getDate() + 3);
  }
  SalesList: SalesLeadDTO[] = []
  User = this._userService.User()
  ngOnInit() {
    this.dataTableLoading = true
    this.getAllSalesLead()

  }

  getAllSalesLead() {
    this.loaderService.turnOffLoader.next(true)
    let body: { actionUser: number, companyId: number } = {
      actionUser: this.User.userId,
      companyId: parseInt(this.User.companyId)
    }
    this._salesleadService.getAllSalesLead(body).subscribe(res => {
      this.SalesList = res.newAndOpen;
      this.loaderService.turnOffLoader.next(false)
      this.dataTableLoading = false
    })
  }

  handleActionClick(event: { actionName: string; rowData: SalesLeadDTO; }) {
    if (event.actionName == 'View') {
      console.log(event.rowData);
      
      this._salesleadService.navigateToViewLead(event.rowData.leadId)
    }
  }
}
