import { Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../ticket.service';
import { SupportTicketDTO, TicketActivityDTO, TicketActivityList, TicketCommentDTO, TicketUserDTO, UserList } from '../../interface/ticket.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent {
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

  commentForm = new FormGroup({
    htmlContent: new FormControl('')
  })

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '150px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarPosition: 'top',


  };

  constructor(private route: ActivatedRoute, private _ticketService: TicketService, private sanitizer: DomSanitizer, private modalService: NgbModal, private _userService: UserService) { }

  ngOnInit(): void {
    this.GetAllUserList();
    this.route.params.subscribe(params => {
      this.ticketId = +params['id'];
      this.getTicketDetail(this.ticketId)
    });
  }


  getTicketDetail(id: number) {
    let data = {
      ticketId: id
    }
    this._ticketService.getTicketDetailsById(data).subscribe(res => {
      this.ticketInfo = res.tickets[0]
      this._ticketService.getTicketComments({ ticketId: this.ticketInfo.ticketId }).subscribe(res => {
        this.ticketComments = res.ticketActivities
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
    this.detailActivityDivVisible = false
    this.assignTicketToUserDivVisible = !this.assignTicketToUserDivVisible
  }
  TakeOverButtonOnClick() {

  }

  SupportTicket_Forceclose() {

  }

  @ViewChild('CreateTicketModal') ticketModalContent!: ElementRef
  ticketModal!: NgbModalRef
  OpenEditTicketModal() {
    this.ticketModal = this.modalService.open(this.ticketModalContent, { size: 'lg' })
  }

  SupportTicket_ReOpen() {

  }
  handleRTEsubmit(event:any){
    console.log(event);
  }
  InsertTicketActivity() {
    console.log(this.commentForm.value);
    let data: TicketCommentDTO = {
      createdBy: this.User.userId.toString(),
      ticketComments: this.commentForm.controls.htmlContent.value as string,
      ticketId: this.ticketInfo.ticketId
    }

    this._ticketService.getTicketComments(data).subscribe(res => {
      this.commentForm.reset()
      this.ticketComments = res.ticketActivities
    })

  }

}
