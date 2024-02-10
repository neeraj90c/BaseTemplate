import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/services/user.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/interface/UserRoleDTO';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {

  constructor(private _commonService: CommonService, private router: Router, public modalService: NgbModal, public _userService: UserService, private confirmmodalserviceService: ConfirmmodalserviceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    if (Object.keys(currentParams).length === 0) {
      this.router.navigate(['/RAD'], { queryParams: { pageNo: this.UserRoleDTO.pageNo, pageSize: this.UserRoleDTO.pageSize } })
    } else {
      this.UserRoleDTO.pageSize = currentParams['pageSize'] as number
      this.UserRoleDTO.pageNo = currentParams['pageNo'] as number
    }
    this.RolesCrud(this.UserRoleDTO)
  }

  User = this._userService.User()

  roleList: UserRole[] = [];
  filteredroles: any;
  editroleModel!: NgbModalRef;

  @ViewChild('manageRoleModal', { static: false }) manageRoleModal!: ElementRef;

  UserRoleDTO: UserRole = {
    pageNo: 1,
    pageSize: 10,
    rowNum: 0,
    totalCount: 0,
    roleId: 0,
    roleName: '',
    roleCode: '',
    roleDesc: '',
    isActive: 0,
    createdBy: '',
    createdOn: new Date,
    modifiedBy: '',
    modifiedOn: new Date,
    isDeleted: 0,
    actionUser: 0
  }


  CreateRoleForm = new FormGroup({
    RoleId: new FormControl(0,),
    RoleName: new FormControl('', [Validators.required]),
    RoleCode: new FormControl('',),
    RoleDescription: new FormControl('', [Validators.required]),
  }, Validators.required
  );


  //Below getter method for calling Form Controls

  get RoleNameCtrl(): FormControl {
    return this.CreateRoleForm.get('RoleName') as FormControl;
  }
  get RoleCodeCtrl(): FormControl {
    return this.CreateRoleForm.get('RoleCode') as FormControl;
  }

  get RoleDescriptionCtrl(): FormControl {
    return this.CreateRoleForm.get('RoleDescription') as FormControl;
  }


  /**
   * This is an event handler that is triggered from the reusable table.
   * While rowData is the row object for delete and update/edit purpose
   * @param e This argument consists of Object for the particular row
   */
  public handleActionClick(e: { actionName: string, rowData: UserRole }) {
    const { actionName, rowData } = e

    if (actionName === 'Edit') {

      this.editroleModel = this.modalService.open(this.manageRoleModal)
      this.CreateRoleForm.patchValue({
        RoleId: rowData.roleId,
        RoleName: rowData.roleName,
        RoleCode: rowData.roleCode,
        RoleDescription: rowData.roleDesc
      });
    }
    else if (actionName === 'Delete') {
      this.confirmmodalserviceService.openSwalModal(rowData.roleName as string, rowData).subscribe((res: UserRole) => {
        if (res) {
          res.isActive = 0;
          res.isDeleted = 1;
          res.modifiedBy = this.User.userId.toLocaleString()
          res.modifiedOn = new Date

          this.RolesCrud(res)
        }

      })
    }

  }



  /**
   * This function will will reset the RoleForm and open the modal
   */
  public CreateRole() {
    this.CreateRoleForm.reset()
    this.editroleModel = this.modalService.open(this.manageRoleModal)
  }


  /**
   * This Function is triggered on UserRoles form Submitted.
   * The MarkAsTouch function trigger valid input and inline validation on UserRole Form.
    */
  public SubmitRoleForm() {
    Object.values(this.CreateRoleForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.CreateRoleForm.valid) {
      let roledata = { ...this.UserRoleDTO }
      let { RoleCode, RoleDescription, RoleId, RoleName } = this.CreateRoleForm.controls
      roledata.roleId = RoleId.value ? RoleId.value : 0
      roledata.roleName = RoleName.value as string
      roledata.roleCode = RoleCode.value as string
      roledata.roleDesc = RoleDescription.value as string
      roledata.isActive = 1
      this.RolesCrud(roledata)
    }
  }



  /**
   * API Call functionalities RolesCurd Method for create , edit and delete role.
   * @param data  this is empty parameter for calling API
   * After that it calls a function that has subscription to an api and binds the data with the view.
   */
  public RolesCrud(data: UserRole) {
    data.actionUser = this.User.userId
    this._commonService.getRoleList(data).subscribe((rolesData) => {
      this.roleList = rolesData.roles;
      this.CreateRoleForm.reset()
      this.editroleModel?.close()
    })
  }


  // Page handling and query parameters 
  handlePageSizeChange(e: any) {
    this.UserRoleDTO.pageNo = +e.currentPage
    this.UserRoleDTO.pageSize = +e.pageSize
    this.router.navigate(['/RAD'], { queryParams: { pageNo: this.UserRoleDTO.pageNo, pageSize: this.UserRoleDTO.pageSize } })
    this.RolesCrud(this.UserRoleDTO)
  }

}
