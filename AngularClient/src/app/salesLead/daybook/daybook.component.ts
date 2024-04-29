import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SalesleadService } from '../saleslead.service';
import { SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.scss']
})
export class DaybookComponent implements OnInit {

  constructor(private _userService: UserService, private _salesLeadService: SalesleadService, private _modalService: NgbModal, private sanitizer: DomSanitizer) { }


  dataTableLoading: boolean = false;
  User = this._userService.User()
  FreshLeads: SalesLeadDTO[] = []
  FollowUpLeads: SalesLeadDTO[] = []
  FollowUpsScheduled: SalesLeadDTO[] = []

  DayBookSendModal!: NgbModalRef

  @ViewChild('sendDaybook') daybookModalcontent!: ElementRef

  @ViewChild('emailDaybookData', { static: false }) emailDaybookDataRef!: ElementRef;


  DaybookForm = new FormGroup({
    sendTo: new FormControl(),
    subject: new FormControl(),
    emailBody: new FormControl()
  })


  ngOnInit(): void {
    this.getDaybookByUserId(this.User.userId,new Date())
  }

  getDaybookByUserId(id: number,currentDate:Date) {
    let data: { actionUser: number, currentDate: Date }={
      actionUser:id,
      currentDate: currentDate
    }
    this._salesLeadService.Daybook_ByUserId(data).subscribe(res => {
      this.FreshLeads = res.freshLeads
      this.FollowUpLeads = res.followUp
      this.FollowUpsScheduled = res.scheduledFollowUps
    })
  }




  handleActionClick($event: { actionName: string; rowData: any; }) {
    throw new Error('Method not implemented.');
  }
  handleRedirect(event: { rowData: SalesLeadDTO; }) {
    this._salesLeadService.navigateToViewLead(event.rowData.leadId)
  }

  openSendDaybookModal() {
    this.DayBookSendModal = this._modalService.open(this.daybookModalcontent, { size: 'xl' })
  }

  returnSanitizedDom(data: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data)
  }

  submitDaybookEmail() {

    const htmlContent = document.querySelector('.modal-body')
    console.log(htmlContent?.querySelector('.daybookDataEmailBody')?.innerHTML);
    this.DaybookForm.patchValue({
      sendTo: 'abc@gmail.com',
      subject: 'Subject',
      emailBody: htmlContent?.querySelector('.daybookDataEmailBody')?.innerHTML,

    })
    console.log(this.DaybookForm.value);
  }

  selectedDate:any = formatDate(new Date(), 'yyyy-MM-dd', 'en')
  loadDataByDate(){
    this.getDaybookByUserId(this.User.userId,this.selectedDate)
  }

}
