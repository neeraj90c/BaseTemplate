import { Component } from '@angular/core';
import { GetWorkListDTO, SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';
import { SalesleadService } from '../../saleslead.service';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lead-success',
  templateUrl: './lead-success.component.html',
  styleUrls: ['./lead-success.component.scss']
})
export class LeadSuccessComponent {
  LeadData: SalesLeadDTO[] = [];

  constructor(private _salesleadService: SalesleadService,private userService:UserService) { }

  ngOnInit() {
    this.dateForm.patchValue({
      startDate:formatDate(this.firstDayOfMonth,'yyyy-MM-dd','en'),
      endDate:formatDate(this.today,'yyyy-MM-dd','en')
    })

    this.LoadDataWithDate()
  }

  dataTableLoading:boolean = true
  today = new Date();
  firstDayOfMonth = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  })
  User = this.userService.User()
  
  data: GetWorkListDTO = {
    actionUser: 0,
    companyId: 0,
    startDate: this.firstDayOfMonth,
    endDate: this.today
  }

  getOpenLeads(data:GetWorkListDTO) {
    this._salesleadService.getLeadWorkList(data).subscribe(res => {
      this.LeadData = res.success
      this.dataTableLoading = false
    })
  }


  LoadDataWithDate(){
    console.log(this.dateForm.value);
    let data: GetWorkListDTO = {
      actionUser: this.User.userId,
      companyId: parseInt(this.User.companyId),
      startDate: this.dateForm.controls.startDate.value as Date,
      endDate: this.dateForm.controls.endDate.value as Date
    };

    this.getOpenLeads(data)
  }

  handleActionClick(event: { actionName: string; rowData: SalesLeadDTO; }) {
    if (event.actionName == 'View') {
      console.log(event.rowData);
      
      this._salesleadService.navigateToViewLead(event.rowData.leadId)
    }
  }
}
