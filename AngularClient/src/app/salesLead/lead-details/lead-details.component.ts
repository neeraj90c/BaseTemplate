import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesleadService } from '../saleslead.service';
import { AssignLeadDTO, LeadActivityDTO, LeadAsigneeDTO, LeadContactDetail, LeadResolverDTO, ProjectListDTO, SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/ticket/ticket.service';
import { TicketUserDTO } from 'src/app/interface/ticket.interface';
import { formatDate } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { notEqualToZeroValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

  detailActivityDivVisible: boolean = false;
  assignTicketToUserDivVisible: boolean = false;
  commentForm = new FormGroup({});
  ProjectList: ProjectListDTO[] = [];

  leadForm = new FormGroup({
    projectId: new FormControl(0, [notEqualToZeroValidator]),
    lTitle: new FormControl('', [Validators.required]),
    lDesc: new FormControl(),
    category: new FormControl(),
    tagList: new FormControl(),
    leadStatus: new FormControl(),
    leadPriority: new FormControl(),
    leadDate: new FormControl(),
    nextFollowUpDate: new FormControl(),
    addField1: new FormControl(),
    addField2: new FormControl(),
    addField3: new FormControl(),
  })
  ContactList!: LeadContactDetail[];

  get lTitleCtrl(): FormControl {
    return this.leadForm.get('lTitle') as FormControl;
  }

  get projectIdCtrl(): FormControl {
    return this.leadForm.get('projectId') as FormControl;
  }
  OpenEditLeadModal() {
    this.leadForm.patchValue({
      projectId: this.leadDetail.projectId,
      leadStatus: this.leadDetail.leadStatus,
      category: this.leadDetail.category,
      leadPriority: this.leadDetail.leadPriority,
      leadDate: this.leadDetail.leadDate,
      nextFollowUpDate: this.leadDetail.nextFollowUpDate,
      addField1: this.leadDetail.addField1,
      addField2: this.leadDetail.addField2,
      addField3: this.leadDetail.addField3,
      lTitle: this.leadDetail.lTitle,
      tagList: this.leadDetail.tagList
    })
    this.LeadModal = this.modalService.open(this.createLeadModal, { size: 'xl' })
  }

  @ViewChild('CreateLeadModal') createLeadModal!: ElementRef
  LeadModal!: NgbModalRef
  AssignTicketToUserOnClick() {
    this.detailActivityDivVisible = false
    this.assignTicketToUserDivVisible = !this.assignTicketToUserDivVisible
  }

  toggleCommentDialogOnClick() {
    this.assignTicketToUserDivVisible = false
    this.detailActivityDivVisible = !this.detailActivityDivVisible
  }

  constructor(private router: Router, private modalService: NgbModal, private route: ActivatedRoute, private _salesleadService: SalesleadService, private sanitizer: DomSanitizer, private _userService: UserService, private toaster: ToastrService, private _ticketService: TicketService) {
    this.today = new Date();
    this.startDate = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

    // Add 3 days to the current date
    this.nextFollowUpDate = new Date(this.today);
    this.nextFollowUpDate.setDate(this.today.getDate() + 3);
  }
  today!: Date;
  startDate!: Date;
  nextFollowUpDate!: Date;
  User = this._userService.User()
  userList: TicketUserDTO[] = []
  leadId: number = 0
  ngOnInit(): void {
    this.activityLoading = true
    this.route.params.subscribe(params => {
      this.leadId = +params['id'];
      this.getLeadDetailById(this.leadId)
      this.GetAllUserList()
      this.GetProjectList()

    });
  }
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];

  leadDetail: SalesLeadDTO = {
    leadId: 0,
    projectId: 0,
    companyId: 0,
    lTitle: '',
    lDesc: '',
    category: '',
    tagList: '',
    leadOwner: '',
    leadStatus: '',
    leadPriority: '',
    leadDate: new Date,
    nextFollowUpDate: new Date,
    addField1: '',
    addField2: '',
    addField3: '',
    isActive: 0,
    isDeleted: 0,
    createdBy: '',
    createdOn: new Date,
    modifiedBy: '',
    modifiedOn: new Date,
    actionUser: ''
  }
  leadAssigneeForm = new FormGroup({
    assignedTo: new FormControl(),
    aDesc: new FormControl(),
    aStatus: new FormControl()
  })
  assigneeList: LeadAsigneeDTO[] = []
  leadActivity: LeadActivityDTO[] = []
  leadResolverList: LeadResolverDTO[] = [];
  LeadAssigneeTableLoading: boolean = false;

  getAllLeadContact() {
    let data: LeadContactDetail = {
      contactId: 0,
      leadId: this.leadDetail.leadId,
      cName: '',
      cNumber: '',
      cEmail: '',
      cDesignation: '',
      cDesc: '',
      isActive: 0,
      isDeleted: 0,
      createdBy: 0,
      createdOn: new Date,
      modifiedBy: 0,
      modifiedOn: new Date,
      actionUser: 0
    }

    this._salesleadService.leadContactReadByLeadId(data).subscribe(res => {
      this.ContactList = res.items
    })
  }



  getLeadDetailById(id: number) {
    this._salesleadService.getSalesLeadByLeadId(id).subscribe(res => {
      this.leadDetail = res
      this.getLeadActivity()
      this.getLeadResolvereList()
      this.getAssignedUsers()
      this.getAllLeadContact()



    })
  }

  getAssignedUsers() {
    this.LeadAssigneeTableLoading = true
    this._salesleadService.getLeadAssigneesByLeadId(this.leadDetail.leadId).subscribe(res => {
      this.assigneeList = res.items
      this.LeadAssigneeTableLoading = false
    })
  }
  getLeadResolvereList() {
    this._salesleadService.getLeadResolverList().subscribe(res => {
      this.leadResolverList = res.items
    })
  }
  getLeadActivity() {
    this.activityLoading = true
    this._salesleadService.getLeadActivityByLeadId(this.leadDetail.leadId).subscribe(res => {
      this.leadActivity = res.items
      this.activityLoading = false

    })
  }

  assignLead(data: { lAid: number, leadId: number, assignedTo: string, aDesc: string, aStatus: string, actionUser: number }) {
    this._salesleadService.assignLeadToUser(data).subscribe(res => {
      this.getAssignedUsers()
    })
  }

  activityLoading: boolean = false;
  returnSanitizedDom(data: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data)
  }

  handleRTEsubmit(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
    console.log(event.value);
    let data: { leadId: number; leadComments: string; actionUser: number; } = {
      leadId: this.leadDetail.leadId,
      leadComments: event.value,
      actionUser: this.User.userId
    }
    this._salesleadService.insertLeadActivity(data).subscribe(res => {
      event.clearText();
      this.getLeadActivity()
    })

  }
  LeadAsigneeSaveAsignee() {
    let form = { ...this.leadAssigneeForm.value }
    let data: { lAid: number, leadId: number, assignedTo: string, aDesc: string, aStatus: string, actionUser: number } = {
      lAid: 0,
      leadId: this.leadDetail.leadId,
      assignedTo: form.assignedTo,
      aDesc: form.aDesc,
      aStatus: 'Open',
      actionUser: this.User.userId
    }

    this.assignLead(data)

  }

  GetUserNameById(id: string): any {
    const user = this.userList
      .filter(i => i.key === id)
      .map(user => user.value)[0];  // Using [0] to get the first element or undefined

    if (user) {
      return user;
    }

    // Handle the case where the user with the specified ID is not found
    return null;
  }


  LeadAsigneeStartTask(leadAsignee: LeadAsigneeDTO) {
    leadAsignee.aStatus = "InProgress",
      leadAsignee.actionUser = this.User.userId,
      this._salesleadService.leadStatusUpdate(leadAsignee).subscribe(res => {
        console.log(res);
        leadAsignee = res.items[0]
        this.toaster.success('Lead Started!')
        this.getLeadDetailById(this.leadId)
      })
  }
  LeadAsigneeCloseTask(leadAsignee: LeadAsigneeDTO) {
    leadAsignee.aStatus = "Close",
      leadAsignee.actionUser = this.User.userId,
      this._salesleadService.leadStatusUpdate(leadAsignee).subscribe(res => {
        console.log(res);
        leadAsignee = res.items[0]
        this.toaster.success('Lead Closed!')
        this.getLeadDetailById(this.leadId)
      })
  }
  LeadAsigneeSuccessTask(leadAsignee: LeadAsigneeDTO) {
    leadAsignee.aStatus = "Success",
      leadAsignee.actionUser = this.User.userId,
      this._salesleadService.leadStatusUpdate(leadAsignee).subscribe(res => {
        console.log(res);
        leadAsignee = res.items[0]
        this.toaster.success('Lead Closed and Success!')
        this.getLeadDetailById(this.leadId)
      })
  }

  LeadAsigneeHoldTask(leadAsignee: LeadAsigneeDTO) {
    leadAsignee.aStatus = "Hold",
      leadAsignee.actionUser = this.User.userId,
      this._salesleadService.leadStatusUpdate(leadAsignee).subscribe(res => {
        console.log(res);
        leadAsignee = res.items[0]
        this.toaster.warning('Lead On Hold!')
        this.getLeadDetailById(this.leadId)
      })
  }

  SupportTicket_ReOpen() {

  }


  // TicketAsigneeCloseTask(ticketAsignee: TicketAsigneeDTO) {
  //   ticketAsignee.aStatus = "Close";
  //   ticketAsignee.actionUser = this.User.userId.toString();
  //   this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
  //     this.assigneeList = res.items
  //     this.toaster.success('Ticket Closed!!')

  //   })
  // }
  // TicketAsigneeHoldTask(ticketAsignee: TicketAsigneeDTO) {
  //   ticketAsignee.aStatus = "Hold";
  //   ticketAsignee.actionUser = this.User.userId.toString(),
  //     this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
  //       ticketAsignee = res.ticketAsignee[0]
  //       this.toaster.success('Ticket on Hold!!')
  //     })
  // }
  GetAllUserList() {
    this._ticketService.getAllUserList().subscribe(res => {
      this.userList = res.dropDownList
    })
  }
  returnFormattedDate(date: any) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US')
  }

  TakeOverButtonOnClick() {
    let data: AssignLeadDTO = {
      leadId: this.leadDetail.leadId,
      assignedTo: this.User.userId.toString(),
      aDesc: '',
      aStatus: 'InProgress',
      actionUser: this.User.userId
    }
    this._salesleadService.salesLeads_AssignToUser(data).subscribe(res => {
      this.getLeadDetailById(this.leadId)
      this.toaster.success('Lead Taken Over!!')
    })
  }
  SalesLead_Forceclose() {
    let data: AssignLeadDTO = {
      leadId: this.leadDetail.leadId,
      assignedTo: this.User.userId.toString(),
      aDesc: '',
      aStatus: '',
      actionUser: this.User.userId
    }
    this._salesleadService.salesLeads_ForceClose(data).subscribe(res => {
      this.getLeadDetailById(this.leadId)
      this.toaster.success('Lead Closed!!')
    })
  }

  leadDateChanged(event: any) {
    let leadDate = new Date(this.leadForm.controls.leadDate.value)
    let nextDate = new Date()
    nextDate.setDate(leadDate.getDate() + 3);
    this.leadForm.patchValue({
      nextFollowUpDate: formatDate(nextDate, 'yyyy-MM-dd', 'en')
    })

  }

  LeadUpdate(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
    // console.log(event.value);
    // console.log(this.leadForm.value);

    Object.values(this.leadForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.leadForm.valid) {
      let formData = { ...this.leadForm.value }
      let leadData: SalesLeadDTO = {
        leadId: 0,
        projectId: formData.projectId as number,
        companyId: parseInt(this.User.companyId),
        lTitle: formData.lTitle as string,
        lDesc: event.value,
        category: formData.category,
        tagList: formData.tagList,
        leadOwner: this.User.userId.toString() as string,
        leadStatus: formData.leadStatus,
        leadPriority: formData.leadPriority,
        leadDate: formData.leadDate,
        nextFollowUpDate: formData.nextFollowUpDate,
        addField1: formData.addField1,
        addField2: formData.addField2,
        addField3: formData.addField3,
        isActive: 1,
        isDeleted: 0,
        createdBy: this.User.userId.toString(),
        createdOn: new Date(),
        modifiedBy: '',
        modifiedOn: new Date(),
        actionUser: this.User.userId.toString()
      }

      console.log(leadData);
      this._salesleadService.updateSalesLead(leadData).subscribe(res => {
        console.log(res);
        event.clearText()

        this.LeadModal.close()
        this.reloadCurrentRoute()

      })

    }


  }
  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  GetProjectList() {
    this._salesleadService.getAllProjectList().subscribe(res => {
      this.ProjectList = res.items
    })
  }

  contactForm = new FormGroup({
    cName: new FormControl('', [Validators.required]),
    cNumber: new FormControl('', [Validators.required]),
    cEmail: new FormControl(),
    cDesignation: new FormControl(),
    cDesc: new FormControl(),
  })

  get cNameCtrl(): FormControl {
    return this, this.contactForm.controls.cName as FormControl
  }

  get cNumberCtrl(): FormControl {
    return this, this.contactForm.controls.cNumber as FormControl
  }

  @ViewChild('addContactForm') contactFormContent!:ElementRef
  contactFormModal!:NgbModalRef

  OpenContactForm(){
    this.contactFormModal = this.modalService.open(this.contactFormContent,{size:'xl'})
  }
  handleContactsubmit(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.contactForm.valid) {
      let { cName, cNumber, cDesignation, cEmail, cDesc } = this.contactForm.value
      let contactDetail: LeadContactDetail = {
        contactId: 0,
        leadId: this.leadDetail.leadId,
        cName: cName as string,
        cNumber: cNumber as string,
        cEmail: cEmail,
        cDesignation: cDesignation,
        cDesc: cDesc as string,
        isActive: 1,
        isDeleted: 0,
        createdBy: 0,
        createdOn: new Date,
        modifiedBy: 0,
        modifiedOn: new Date,
        actionUser: this.User.userId
      }
      this._salesleadService.leadContactInsert(contactDetail).subscribe((res => {
        this.ContactList = res.items
        this.contactForm.reset()
        event.clearText()
        this.toaster.success('Contact Added!!')
        this.contactFormModal.close()
      }))
    }
  }

}
