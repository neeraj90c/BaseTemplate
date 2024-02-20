import { Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../ticket.service';
import { SupportTicketDTO, TicketActivityDTO, TicketActivityList, TicketAsigneeDTO, TicketCommentDTO, TicketUserDTO, UserList } from '../../interface/ticket.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
assigneeTableLoading: boolean = false;
resolverList:SupportTicketDTO[]=[]
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

  getTicketResolverList(){
    this._ticketService.getTicketResolverList({actionUser: this.User.userId}).subscribe(res=>{
      console.log(res.tickets);
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
        next:(res) => {
          this.ticketComments = res.ticketActivities
        },complete:()=>{
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
    this.toaster.warning('Feature Not Available!')
  }

  @ViewChild('CreateTicketModal') ticketModalContent!: ElementRef
  ticketModal!: NgbModalRef
  OpenEditTicketModal() {
    this.ticketModal = this.modalService.open(this.ticketModalContent, { size: 'lg' })
  }

  SupportTicket_ReOpen() {

  }
  handleRTEsubmit(event: { value: string, clearText: () => void }) {

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
        console.log(res.ticketAsignee[0]);
        ticketAsignee = res.ticketAsignee[0]
        this.toaster.success('Ticket Started!')

      })
  }
  TicketAsigneeCloseTask(ticketAsignee: TicketAsigneeDTO){
    ticketAsignee.aStatus = "Close";
    ticketAsignee.actionUser = this.User.userId.toString();
    this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
      console.log(res.ticketAsignee[0]);
      ticketAsignee = res.ticketAsignee[0]
      this.toaster.success('Ticket Closed!!')

    })
  }
  TicketAsigneeHoldTask(ticketAsignee: TicketAsigneeDTO){
    ticketAsignee.aStatus = "Hold";
    ticketAsignee.actionUser = this.User.userId.toString(),
    this._ticketService.ticketStatusUpdate(ticketAsignee).subscribe(res => {
      console.log(res.ticketAsignee[0]);
      ticketAsignee = res.ticketAsignee[0]
      this.toaster.success('Ticket on Hold!!')
    })
  }


}
