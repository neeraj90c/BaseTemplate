import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { SupportTicketDTO } from '../../interface/ticket.interface';
import { CompanyMasterDTO } from 'src/app/interface/CompanyMasterDTO';
import { CommonService } from 'src/app/Common/services/common.service';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  CompanyDTO: CompanyMasterDTO = {
    companyId: 0,
    cName: '',
    cCode: '',
    cDesc: '',
    cAddress: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    subCategory: '',
    contactPerson: '',
    createdOn: new Date,
    modifiedBy: '',
    createdBy: '',
    modifiedOn: new Date,
    isActive: 0,
    isDeleted: 0,
    cType: '',
    actionUser: ''
  }
  CompanyList: CompanyMasterDTO[] = [];
  constructor(private _ticketService: TicketService,
    private userService: UserService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private _commonService: CommonService
  ) { }
  COMPANY_ID = environment.COMPANY_CODE
  User = this.userService.User()

  activeTickets: SupportTicketDTO[] = []
  inprogressTickets: SupportTicketDTO[] = []
  closedTickets: SupportTicketDTO[] = []
  workInProgress: SupportTicketDTO[] = []

  ngOnInit(): void {
    this.GetAllTicketData()
    this.GetCompanyList(this.CompanyDTO)
  }
  title = 'Tickets Created but Not Assigned to anyone'
  changeTitle(title:string){
    this.title = title
  }
  GetAllTicketData() {
    let data = { actionUser: this.User.userId, companyId: parseInt(this.COMPANY_ID) }
    this._ticketService.getClientUserTicketList(data).subscribe(res => {
      this.activeTickets = res.activeTickets
      this.inprogressTickets = res.inprogressTickets
      this.closedTickets = res.closedTickets
      this.workInProgress = res.workInProgress
    })
  }

  @ViewChild('CreateTicketModal') ticketModalContent!: ElementRef
  ticketModal!: NgbModalRef
  updateTicketForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    ticketPriority: new FormControl(''),
    ticketType: new FormControl(''),
    targetDate: new FormControl(),
    tagList: new FormControl('', [Validators.required]),
    affectsCustomer: new FormControl(false),
    department: new FormControl(''),
    raisedBy: new FormControl('', [Validators.required]),
    addField3: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    projectId: new FormControl(0),
    companyId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)])
  })

  get titleCtrl(): FormControl {
    return this.updateTicketForm.controls.title as FormControl
  }
  get tagListCtrl(): FormControl {
    return this.updateTicketForm.controls.tagList as FormControl
  }
  get raisedByCtrl(): FormControl {
    return this.updateTicketForm.controls.raisedBy as FormControl
  }
  get addField3Ctrl(): FormControl {
    return this.updateTicketForm.controls.addField3 as FormControl
  }
  get companyIdCtrl(): FormControl {
    return this.updateTicketForm.controls.companyId as FormControl
  }



  TicketOpenCreateTicketModal() {
    this.updateTicketForm.patchValue({
      companyId:0,
      projectId:1,
      category:'1',
      ticketPriority:'High',
      ticketType:'Technical',
      affectsCustomer:true
    })
    this.ticketModal = this.modalService.open(this.ticketModalContent, { size: 'xl' })
  }
  public handleActionClick(event:{ actionName:string, rowData: SupportTicketDTO}) {
    let { actionName, rowData} = event
    if(actionName === 'View'){
      this._ticketService.navigateToViewTicket(rowData.ticketId)
    }
  }
  GetCompanyList(data: CompanyMasterDTO) {
    this._commonService.companyCRUD(data).subscribe(res => {
      this.CompanyList = res.companies
    })
  }

  TicketUpdate(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
    console.log(event.value);
    Object.values(this.updateTicketForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.updateTicketForm.valid) {
      let formData = { ...this.updateTicketForm.value }


      let data: SupportTicketDTO = {
        title: formData.title as string,
        actionUser: this.User.userId,
        addField3: formData.addField3 as string,
        affectsCustomer: formData.affectsCustomer ? 'true' : 'false',
        category: formData.category as string,
        department: formData.department as string,
        projectId: formData.projectId as number,
        raisedBy: formData.raisedBy as string,
        tagList: formData.tagList as string,
        targetDate: formData.targetDate,
        ticketPriority: formData.ticketPriority as string,
        ticketType: formData.ticketType as string,
        ticketDesc: event.value as string,
        ticketId: 0,
        assignedTo: '',
        ticketStatus: '',
        appVersion: '',
        dueDate: null,
        estimatedDuration: '',
        actualDuration: '',
        resolutionDate: new Date,
        addField4: '',
        addField5: '',
        isActive: 0,
        isDeleted: 0,
        ticketOwner: '',
        companyId: formData.companyId as number,
        companyName: '',
        companyCode: '',
        projectName: '',
        createdOn: new Date,
        modifiedOn: new Date,
        assignedToName: '',
        ownedBy: '',
        ticketComments: '',
        createdBy: '',
        modifiedBy: '',
        name: '',
        assignedToId: 0,
        userId: 0,
        createdByName: '',
        startDate: new Date,
        endDate: new Date
      }

      this._ticketService.manageTicket(data).subscribe(res => {
        this.ticketModal.close();
        this.toaster.success('Ticket Created!')
        // this.getTicketDetail(this.ticketId)
        this.GetAllTicketData()
      })
    }


  }


}
