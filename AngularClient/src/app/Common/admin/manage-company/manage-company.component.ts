import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TicketService } from 'src/app/ticket/ticket.service';
import { CommonService } from '../../services/common.service';
import { CompanyMasterDTO } from 'src/app/interface/CompanyMasterDTO';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {

  constructor(private modalService: NgbModal, private _commonService: CommonService, private _userService: UserService,private toaster:ToastrService,private confirmModal:ConfirmmodalserviceService) { }
  User = this._userService.User()
  CompanyList: CompanyMasterDTO[] = []

  @ViewChild('companyModalcontent') modalContent!: ElementRef
  companyModal!: NgbModalRef

  companyForm = new FormGroup({
    companyId: new FormControl(0),
    cName: new FormControl('', [Validators.required]),
    cCode: new FormControl('',),
    cDesc: new FormControl(''),
    cAddress: new FormControl(''),
    cEmail: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    website: new FormControl(''),
    category: new FormControl(''),
    subCategory: new FormControl(''),
    contactPerson: new FormControl(),
    type: new FormControl(),
    isActive: new FormControl()
  })

  get cNameCtrl():FormControl{
    return this.companyForm.controls.cName as FormControl
  }

  get cEmailCtrl():FormControl{
    return this.companyForm.controls.cEmail as FormControl
  }



  ngOnInit() {
    this.getCompanyList()
  }

  CompanyCRUD(data: CompanyMasterDTO) {
    this._commonService.companyCRUD(data).subscribe(res => {
      this.CompanyList = res.companies
      this.companyModal?.close()
      this.companyForm.reset()
      this.toaster.success('Success!!')
    })
  }
  getCompanyList() {
    let data: CompanyMasterDTO = {
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
      actionUser: this.User.userId.toString()
    }
    this._commonService.companyCRUD(data).subscribe(res => {
      this.CompanyList = res.companies
      this.companyForm.reset()
    })
  }

  CompanyOpenCompanyModal() {
    this.companyModal = this.modalService.open(this.modalContent, { size: 'lg' })
  }
  handleActionClick(event: { actionName: string, rowData: CompanyMasterDTO }) {
    let { actionName, rowData } = event

    if (actionName === 'Edit') {
      this.companyForm.patchValue({
        cAddress:rowData.cAddress,
        category:rowData.category,
        cCode:rowData.cCode,
        cDesc:rowData.cDesc,
        cEmail:rowData.email,
        cName:rowData.cName,
        companyId:rowData.companyId,
        contactPerson:rowData.contactPerson,
        isActive:rowData.isActive == 1 ? true : false,
        phone:rowData.phone,
        subCategory:rowData.subCategory,
        type:rowData.cType,
        website:rowData.website
      })
      this.companyModal = this.modalService.open(this.modalContent, { size: 'lg' })
    } else if (actionName === 'Delete') {
      this.confirmModal.openSwalModal(rowData.cName,rowData).subscribe(res=>{
        if(res){
          rowData.isActive = 0
          rowData.isDeleted = 1
          rowData.actionUser = this.User.userId.toString()
          this._commonService.companyCRUD(rowData).subscribe(res => {
            this.CompanyList = res.companies
            this.companyModal?.close()
            this.companyForm.reset()
            this.toaster.warning('Company Deleted Successfully!!')
          })
        }
      })
    }
  }

  submitForm() {
    Object.values(this.companyForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.companyForm.valid) {
      let formData = { ...this.companyForm.value }
      let companyMaster: CompanyMasterDTO = {
        companyId: formData.companyId ? formData.companyId : 0,
        cName: formData.cName as string,
        cCode: formData.cCode as string,
        cDesc: formData.cDesc as string,
        cAddress: formData.cAddress as string,
        email: formData.cEmail as string,
        phone: formData.phone as string,
        website: formData.website as string,
        category: formData.category as string,
        subCategory: formData.subCategory as string,
        contactPerson: formData.contactPerson as string,
        createdOn: new Date,
        modifiedBy: '',
        createdBy: '',
        modifiedOn: new Date,
        isActive: formData.isActive ? 1 : 0,
        isDeleted: 0,
        cType: formData.type,
        actionUser: this.User.userId.toString()
      }
      this.CompanyCRUD(companyMaster)
    }

  }
}
