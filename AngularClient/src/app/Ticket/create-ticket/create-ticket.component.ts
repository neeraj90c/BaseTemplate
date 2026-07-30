import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Common/services/common.service';
import { CompanyMasterDTO } from 'src/app/interface/CompanyMasterDTO';
import { UserService } from 'src/app/services/user.service';
import { AttachmentService } from 'src/app/services/attachment.service';
import { AttachmentPickerComponent } from 'src/app/shared/attachment-picker/attachment-picker.component';
import { environment } from 'src/environments/environment';
import { SupportTicketDTO } from '../../interface/ticket.interface';
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
  @ViewChild(AttachmentPickerComponent) attachmentPicker!: AttachmentPickerComponent;

  constructor(private _ticketService: TicketService,
    private userService: UserService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private _commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private _attachmentService: AttachmentService,
  ) { }
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
    //let data = { actionUser: this.User.userId, companyId: parseInt(this.User.companyId) }
    // this._ticketService.getClientUserTicketList(data).subscribe(res => {
    //   this.activeTickets = res.activeTickets
    //   this.inprogressTickets = res.inprogressTickets
    //   this.closedTickets = res.closedTickets
    //   this.workInProgress = res.workInProgress
    // })
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
    companyId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
    ticketDesc : new FormControl('',[Validators.required])
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
  get ticketDescCtrl(): FormControl{
    return this.updateTicketForm.controls.ticketDesc as FormControl
  }



  TicketOpenCreateTicketModal() {

    this.updateTicketForm.patchValue({
      companyId:this.User.companyId == this.User.defaultCompanyId ? 0 : parseInt(this.User.companyId),
      projectId:1,
      category:'1',
      ticketPriority:'High',
      ticketType:'Technical',
      affectsCustomer:true
    })
    if(this.User.companyId != this.User.defaultCompanyId){
      this.updateTicketForm.controls.companyId.disable()
    }

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
    this.updateTicketForm.patchValue({
      ticketDesc : event.value
    })
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
        ticketDesc: formData.ticketDesc as string,
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
        companyId: formData.companyId ? formData.companyId as number : parseInt(this.User.companyId),
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

        // Ticket is already saved successfully at this point - a failed
        // attachment upload below must never make it look like the ticket
        // itself failed to save.
        const newTicketId = res.tickets?.[0]?.ticketId;
        this.uploadStagedAttachments(newTicketId);

        this.GetAllTicketData()
        this.updateTicketForm.reset()
        this.reloadCurrentRoute()
      })
    }


  }

  private uploadStagedAttachments(ticketId: number | undefined): void {
    const files = this.attachmentPicker?.getFiles() ?? [];
    if (files.length === 0) return;

    if (!ticketId) {
      // Ticket saved, but the server didn't hand back a TicketId to attach
      // to - surface this loudly instead of quietly dropping the files,
      // since that's exactly what happened before this check existed.
      this.toaster.error(`Ticket saved, but ${files.length} attachment(s) could not be uploaded - no ticket ID was returned. Attach them manually from the ticket's Attachments section.`);
      return;
    }

    let failedCount = 0;

    files.forEach(file => {
      this._attachmentService.upload(file, ticketId, 'SupportTickets', '', this.User.userId.toString()).subscribe({
        next: () => { /* silent - ticket-created toast already shown */ },
        error: () => {
          failedCount++;
          this.toaster.error(`Ticket saved, but "${file.name}" failed to upload. Attach it again from the ticket's Attachments section.`);
        }
      });
    });

    this.attachmentPicker?.clear();
  }
  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


}
