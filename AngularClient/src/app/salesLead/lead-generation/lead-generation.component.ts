import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SalesleadService } from '../saleslead.service';
import { ProjectListDTO, SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/Common/services/common.service';
import { CompanyMasterDTO } from 'src/app/interface/CompanyMasterDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-lead-generation',
  templateUrl: './lead-generation.component.html',
  styleUrls: ['./lead-generation.component.scss']
})
export class LeadGenerationComponent implements OnInit {

  constructor(private _salesleadService: SalesleadService, private modalService: NgbModal, private _commonService: CommonService,private _userService:UserService, private loaderService:LoaderService) { 
    this.today = new Date();
    this.startDate = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), 1, 0, 0, 0));

    // Add 3 days to the current date
    this.nextFollowUpDate = new Date(this.today);
    this.nextFollowUpDate.setDate(this.today.getDate() + 3);
  }
  User = this._userService.User()
  today!: Date;
  startDate!: Date;
  nextFollowUpDate!: Date;

  ngOnInit(): void {
    this.GetCompanyList(this.CompanyMaster)
    this.GetProjectList()
  }

  @ViewChild('CreateLeadModal') createLeadModal!: ElementRef
  LeadModal!: NgbModalRef
  CompanyList: CompanyMasterDTO[] = [];
  ProjectList: ProjectListDTO[]=[];

  CompanyMaster: CompanyMasterDTO = {
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

  leadForm = new FormGroup({
    projectId: new FormControl(0,[Validators.pattern(/^[1-9]\d*$/)]),
    lTitle: new FormControl('',[Validators.required]),
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


  GetCompanyList(data: CompanyMasterDTO) {
    this._commonService.companyCRUD(data).subscribe(res => {
      this.CompanyList = res.companies
    })
  }
  GetProjectList() {
    this._salesleadService.getAllProjectList().subscribe(res => {
      this.ProjectList = res.items
    })
  }

  OpenCreateLeadModal() {
    this.leadForm.patchValue({
      projectId:0,
      leadStatus:'New',
      leadDate : formatDate(this.today,'yyyy-MM-dd','en'),
      nextFollowUpDate:formatDate(this.nextFollowUpDate,'yyyy-MM-dd','en')
    })
    this.LeadModal = this.modalService.open(this.createLeadModal, { size: 'xl' })
  }


  LeadUpdate(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
    // console.log(event.value);
    // console.log(this.leadForm.value);

    Object.values(this.leadForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.leadForm.valid) {
      let formData = { ...this.leadForm.value }
      let leadData:SalesLeadDTO = {
        leadId: 0,
        projectId: formData.projectId as number,
        companyId: parseInt(this.User.defaultCompanyId),
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
        actionUser: this.User.userId
      }

      console.log(leadData);
      this._salesleadService.createSalesLead(leadData).subscribe(res=>{
        console.log(res);
        
      })
      
    }


  }

}
