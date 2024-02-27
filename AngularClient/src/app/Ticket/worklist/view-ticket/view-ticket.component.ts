import { Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../ticket.service';
import { SupportTicketDTO, TicketActivityDTO, TicketActivityList, TicketAsigneeDTO, TicketCommentDTO, TicketUserDTO, UserList } from '../../../interface/ticket.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RichTextEditorComponent } from 'src/app/shared/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent {
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
  User = this._userService.User()
  ticketId!: number;
  ticketInfo: SupportTicketDTO = {
    ticketId: 0,
    title: '',
    ticketDesc: '',
    ticketType: '',
    category: '',
    tagList: '',
    assignedTo: '',
    ticketStatus: '',
    ticketPriority: '',
    affectsCustomer: '',
    appVersion: '',
    dueDate: null,
    estimatedDuration: '',
    actualDuration: '',
    targetDate: null,
    resolutionDate: new Date,
    department: '',
    raisedBy: '',
    addField3: '',
    addField4: '',
    addField5: '',
    isActive: 0,
    isDeleted: 0,
    ticketOwner: '',
    projectId: 0,
    companyId: 0,
    companyName: '',
    companyCode: '',
    projectName: '',
    actionUser: 0,
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
  ticketComments: TicketActivityDTO[] = []
  userList: TicketUserDTO[] = []

  ticketAsignees: TicketAsigneeDTO[] = []

  commentForm = new FormGroup({
    htmlContent: new FormControl('')
  })
  ticketAssigneeForm = new FormGroup({
    assigneeListID: new FormControl('', [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
    workRatio: new FormControl(),
    ticketAsigneeDescription: new FormControl()
  })

  get assigneeCrl():FormControl{
    return this.ticketAssigneeForm.controls.assigneeListID as FormControl
  }

  assigneeTableLoading: boolean = false;
  resolverList: SupportTicketDTO[] = []
  activityLoading: boolean = false;


  constructor(private route: ActivatedRoute, private _ticketService: TicketService, private sanitizer: DomSanitizer, private modalService: NgbModal, private _userService: UserService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.activityLoading = true
    this.GetAllUserList();
    this.getTicketResolverList();
    this.route.params.subscribe(params => {
      this.ticketId = +params['id'];
      this.getTicketDetail(this.ticketId)
    });
  }

  getTicketResolverList() {
    this._ticketService.getTicketResolverList({ actionUser: this.User.userId }).subscribe(res => {
      this.resolverList = res.tickets

    })
  }

  getTicketDetail(id: number) {
    let data = {
      ticketId: id
    }
    this._ticketService.getTicketDetailsById(data).subscribe(res => {
      this.ticketInfo = res.tickets[0]
      this._ticketService.getTicketComments({ ticketId: this.ticketInfo.ticketId }).subscribe({
        next: (res) => {
          this.ticketComments = res.ticketActivities
        }, complete: () => {
          this.activityLoading = false
        }
      })
    })
  }

  returnSanitizedDom(data: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data)
  }

  returnFormattedDate(date: any) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US')
  }

  GetAllUserList() {
    this._ticketService.getAllUserList().subscribe(res => {
      this.userList = res.dropDownList
    })
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

  detailActivityDivVisible: boolean = false;
  assignTicketToUserDivVisible: boolean = false

  toggleCommentDialogOnClick(): void {
    this.assignTicketToUserDivVisible = false
    this.detailActivityDivVisible = !this.detailActivityDivVisible;
  }

  AssignTicketToUserOnClick() {
    this.assigneeTableLoading = true
    this.detailActivityDivVisible = false
    this.assignTicketToUserDivVisible = !this.assignTicketToUserDivVisible
    this._ticketService.getAllByTicketId({ ticketId: this.ticketId }).subscribe(res => {
      this.ticketAsignees = res.ticketAsignee
      this.assigneeTableLoading = false
    })

    this.ticketAssigneeForm.patchValue({
      assigneeListID: '0',
      workRatio: 100,
      ticketAsigneeDescription: ''
    })
  }
  TakeOverButtonOnClick() {
    let assignModel = {
      ticketId: this.ticketInfo.ticketId,
      actionUser: this.User.userId.toString(),
      assignedTo: this.User.userId.toString()
    };
    this._ticketService.takeOverTicket(assignModel).subscribe(res => {
      this.toaster.success(`ticket #${res.ticketId} taken over successfully!`)

    })
  }

  SupportTicket_Forceclose() {
    let data = { ...this.ticketInfo }
    data.actionUser = this.User.userId
    data.ticketStatus = 'Close'
    this._ticketService.forceCloseTicket(data).subscribe(res => {
      this.getTicketDetail(this.ticketId)
      this.toaster.warning('Ticket Closed!')

    })
  }

  @ViewChild('CreateTicketModal') ticketModalContent!: ElementRef
  ticketModal!: NgbModalRef
  updateTicketForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    ticketPriority: new FormControl(''),
    ticketType: new FormControl(''),
    targetDate: new FormControl(),
    tagList: new FormControl(''),
    affectsCustomer: new FormControl(false),
    department: new FormControl(''),
    raisedBy: new FormControl(''),
    addField3: new FormControl(''),
    category: new FormControl(''),
    projectId: new FormControl(0)
  })

  @ViewChild('editor2') editor2!: RichTextEditorComponent;
  OpenEditTicketModal() {
    let ticketData = { ...this.ticketInfo }
    this.updateTicketForm.patchValue({
      title: ticketData.title,
      ticketType: ticketData.ticketType,
      category: ticketData.category,
      tagList: ticketData.tagList,
      ticketPriority: ticketData.ticketPriority,
      affectsCustomer: ticketData.affectsCustomer.toLowerCase() === 'true' ? true : false,
      targetDate: formatDate(ticketData.targetDate as Date, 'yyyy-MM-dd', 'en'),
      projectId: ticketData.projectId,
      department: ticketData.department,
      raisedBy: ticketData.raisedBy,
      addField3: ticketData.addField3

    })
    this.ticketModal = this.modalService.open(this.ticketModalContent, { size: 'xl' })
    // this.editor2.setHtml(ticketData.ticketDesc)


  }

  SupportTicket_ReOpen() {

    let data: { ticketId: number, actionUser: number } = {
      ticketId: this.ticketInfo.ticketId,
      actionUser: this.User.userId
    }
    this._ticketService.reopenTicket(data).subscribe(res => {
      this.GetAllUserList();
      this.getTicketResolverList();
      this.getTicketDetail(this.ticketId)
      this.toaster.success('Ticket Re-Opened')

    })
  }
  handleRTEsubmit(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {

    let data: TicketCommentDTO = {
      createdBy: this.User.userId.toString(),
      ticketComments: event.value,
      ticketId: this.ticketInfo.ticketId
    }

    this._ticketService.getTicketComments(data).subscribe(res => {
      this.commentForm.reset()
      this.ticketComments = res.ticketActivities
      event.clearText();
      this.toaster.success("Comment Added!")

    })
  }


  TicketAsigneeStartTask(ticketAsignee: TicketAsigneeDTO) {
    ticketAsignee.aStatus = "InProgress",
      ticketAsignee.actionUser = this.User.userId.toString(),
      this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
        ticketAsignee = res.ticketAsignee[0]
        this.toaster.success('Ticket Started!')

      })
  }
  TicketAsigneeCloseTask(ticketAsignee: TicketAsigneeDTO) {
    ticketAsignee.aStatus = "Close";
    ticketAsignee.actionUser = this.User.userId.toString();
    this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
      ticketAsignee = res.ticketAsignee[0]
      this.toaster.success('Ticket Closed!!')

    })
  }
  TicketAsigneeHoldTask(ticketAsignee: TicketAsigneeDTO) {
    ticketAsignee.aStatus = "Hold";
    ticketAsignee.actionUser = this.User.userId.toString(),
      this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
        ticketAsignee = res.ticketAsignee[0]
        this.toaster.success('Ticket on Hold!!')
      })
  }

  TicketAsigneeSaveAsignee() {
    Object.values(this.ticketAssigneeForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if(this.ticketAssigneeForm.valid){
      let assigneeForm = { ...this.ticketAssigneeForm.value }
      let data: TicketAsigneeDTO = {
        taId: 0,
        ticketId: this.ticketInfo.ticketId,
        assignedTo: assigneeForm.assigneeListID as string,
        workRatio: assigneeForm.workRatio,
        assignDesc: assigneeForm.ticketAsigneeDescription,
        aStatus: 'Open',
        actionUser: this.User.userId.toString(),
        assignedToName: '',
        assignedByName: ''
      }
      this.assigneeTableLoading = true
      this._ticketService.assignTicketToUser(data).subscribe(res => {
        this.ticketAsignees = res.ticketAsignee
        this.toaster.success('Ticket Assigned!!')
        this.assigneeTableLoading = false
        this.ticketAssigneeForm.reset();
        this.ticketAssigneeForm.patchValue({
          assigneeListID: '0',
          workRatio: 100,
          ticketAsigneeDescription: ''
        })
      })
    }
  }

  TicketUpdate(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
    console.log(event.value);
    let formData = { ...this.updateTicketForm.value }


    let data = { ...this.ticketInfo }
    data.title = formData.title as string
    data.actionUser = this.User.userId
    data.addField3 = formData.addField3 as string
    data.affectsCustomer = formData.affectsCustomer ? 'true' : 'false'
    data.category = formData.category as string
    data.department = formData.department as string
    data.projectId = formData.projectId as number
    data.raisedBy = formData.raisedBy as string
    data.tagList = formData.tagList as string
    data.targetDate = formData.targetDate
    data.ticketPriority = formData.ticketPriority as string
    data.ticketType = formData.ticketType as string
    data.ticketDesc = event.value as string

    this._ticketService.manageTicket(data).subscribe(res => {
      this.ticketModal.close();
      this.getTicketDetail(this.ticketId)
      this.toaster.success('Ticket Updated!')
    })

  }


}
