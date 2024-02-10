import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaginatedUserRoleCRUD } from 'src/app/interface/User';
import { FilteredUserList, UserCredentials, UserData, UserMasterDTO } from 'src/app/interface/UserMasterDTO';
import { UserRole, UserRoleDTO } from 'src/app/interface/UserRoleDTO';
import { UserService } from 'src/app/services/user.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { environment } from "../../../../environments/environment";
import { CommonService } from '../../services/common.service';
import { notEqualToZeroValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  COMPANY_CODE = environment.COMPANY_CODE
  constructor(private _commonService: CommonService, public _userService: UserService, public modalService: NgbModal, private router: Router, private route: ActivatedRoute, private confirmmodalserviceService: ConfirmmodalserviceService, private toastr: ToastrService) { }

  User = this._userService.User()
  @ViewChild('userListModal', { static: false }) userModalContent!: ElementRef;
  editUserModal!: NgbModalRef;


  @ViewChild('assignRoleModalContent', { static: false }) assignRoleModalContent!: ElementRef;
  assignRoleModal!: NgbModalRef;

  filteredUsers: FilteredUserList[] = []
  filteredRoleList: UserRole[] = [];
  UserMasterlist: UserMasterDTO[] = []
  roleList: UserRole[] = [];
  userRoles: UserRole[] = [];
  UserMaster: UserMasterDTO = {
    pageNo: 1,
    pageSize: 10,
    rowNum: 0,
    totalCount: 0,
    userId: 0,
    firstName: '',
    middleName: " ",
    lastName: '',
    dob: new Date,
    emailId: '',
    mobileNo: '',
    designation: '',
    isActive: 0,
    isDeleted: 0,
    createdBy: '',
    createdOn: new Date,
    modifiedBy: '',
    modifiedOn: new Date,
    actionUser: 0,
    profileImage: '',
    activeUserId: 0,
    webRootPath: '',
    profileImageBase64: "",
    username: '',
    assignedWC: '',
    assignedRoles: '',
    companyId: 0,
    companyName: '',
    roleId: 0

  };
  previewImage: string = '';
  UserRoleDTO: UserRole = {
    pageNo: 1,
    pageSize: 1000,
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


  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    if (Object.keys(currentParams).length === 0) {
      this.router.navigate(['/USRL'], { queryParams: { pageNo: this.UserMaster.pageNo, pageSize: this.UserMaster.pageSize } })
    } else {
      this.UserMaster.pageSize = currentParams['pageSize']
      this.UserMaster.pageNo = currentParams['pageNo']
    }

    this._commonService.getRoleList(this.UserRoleDTO).subscribe((res: UserRoleDTO) => {
      this.roleList = res.roles
    })
    this.UserMasterCRUD(this.UserMaster)


  }

  /**
   * This is the main FormGroup used for User form
   */
  UserForm = new FormGroup(
    {
      profileImage: new FormControl(''),
      userID: new FormControl(0,),
      firstname: new FormControl('', [Validators.required]),
      middlename: new FormControl('',),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      mobileNo: new FormControl(0),
      dob: new FormControl(),
      designation: new FormControl(''),
      roleId: new FormControl(0, [Validators.required, notEqualToZeroValidator]),
      username: new FormControl(''),
      password: new FormControl(''),
      userCredential: new FormGroup({
        userName: new FormControl(''),
        userPassword: new FormControl('')
      })

    }
  )


  UserRoleForm = new FormGroup({
    roleDropDown: new FormControl(0),
    userData: new FormControl()
  });

  get firstnameCtrl(): FormControl {
    return this.UserForm.get('firstname') as FormControl;
  }
  get lastnameCtrl(): FormControl {
    return this.UserForm.get('lastname') as FormControl;
  }
  get emailCtrl(): FormControl {
    return this.UserForm.get('email') as FormControl;
  }
  get dobCtrl(): FormControl {
    return this.UserForm.get('dob') as FormControl;
  }
  get designationCtrl(): FormControl {
    return this.UserForm.get('designation') as FormControl;
  }

  get userNameCtrl(): FormControl {
    return this.UserForm.controls.userCredential.get('userName') as FormControl;
  }
  get userPasswordCtrl(): FormControl {
    return this.UserForm.controls.userCredential.get('userPassword') as FormControl;
  }

  get userRoleCtrl(): FormControl {
    return this.UserForm.get('roleId') as FormControl;
  }



  /**
   * This function will will reset the userForm and open the modal
   */
  public createNewUser() {
    this.UserForm.reset()
    this.UserForm.patchValue({
      roleId: 0
    })
    this.UserForm.get('roleId')?.enable();
    this.editUserModal = this.modalService.open(this.userModalContent)
  }

  /**
   * This function is triggered when user form is submitted
   * This function will first mark all the form controls as touched triggering the validations and inline warnings on UI
   * The inline errors will be handled real-time
   * After that it calls a function that has subscription to an api and binds the data with the view
   */
  public submitUserForm() {
    Object.values(this.UserForm.controls).forEach(control => {
      control.markAsTouched()
    })
    Object.values(this.UserForm.controls.userCredential.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.UserForm.valid) {
      let usermaster = { ...this.UserMaster }
      let { profileImage, userID, firstname, middlename, lastname, email, mobileNo, dob, designation } = this.UserForm.controls
      usermaster.profileImageBase64 = this.previewImage
      usermaster.userId = userID.value ? userID.value : 0
      usermaster.firstName = firstname.value as string
      usermaster.middleName = middlename.value as string
      usermaster.lastName = lastname.value as string
      usermaster.emailId = email.value as string
      usermaster.mobileNo = mobileNo.value?.toString() as string
      usermaster.dob = dob.value as Date
      usermaster.designation = designation.value as string
      usermaster.isActive = 1
      usermaster.profileImage = profileImage.value as string
      this.UserMasterCRUD(usermaster)
    }
    if (this.UserForm.controls.userCredential.valid && this.UserForm.controls.userID.value != 0 && this.UserForm.controls.userID.value != null) {
      this.CreateUserCredentials(this.UserForm.controls.userID.value as number)
    }

  }


  /**
   * This event handler will be triggered when the checkBox is checked in the app-color-table
   * This will make changes depeneding upon the boolean value of isChecked and make an api call
   * @param event This parameter consists of an object rowData and isChecked a boolean value
   */
  public onCheckboxStatusChange(event: { rowData: any, isChecked: boolean }) {
    let { rowData, isChecked } = event;
    rowData.isActive = isChecked ? 1 : 0
    this._commonService.employeeStatusUpdate(rowData).subscribe(res => {
      this.toastr.success('User updated')
    })
  }

  /**
   * This is an event handler that is triggered from the reusable table app-color-table
   * The event triggered from the table is named 'actionClick', while actionName consists the name of the action sent from parent component
   * While rowData is the row object for delete and update/edit purpose
   * @param e This argument consists of actionName and Object for the particular row
   */
  public handleActionClick(e: { actionName: string, rowData: any }) {
    const { actionName, rowData } = e
    let userData = rowData.rowData

    if (actionName === 'Edit') {
      this.previewImage = ""
      this.editUserModal = this.modalService.open(this.userModalContent)
      this.UserForm.patchValue({
        profileImage: userData.profileImage,//'data:image/png;base64,'+userData.profileImageBase64,
        userID: userData.userId,
        firstname: userData.firstName,
        middlename: userData.middleName,
        lastname: userData.lastName,
        email: userData.emailId,
        designation: userData.designation,
        mobileNo: userData.mobileNo,
        dob: formatDate(userData.dob, 'yyyy-MM-dd', 'en'),
        roleId: 0,
        userCredential: { userName: userData.username }
      })
      this.UserForm.get('roleId')?.disable();
      //this.previewImage = userData.profileImageBase64 ? 'data:image/png;base64,'+userData.profileImageBase64 : ""
      console.log(this.UserForm.get('profileImage')?.value);

    }
    else if (actionName === 'Delete') {
      this.confirmmodalserviceService.openSwalModal(rowData.firstName as string, rowData).subscribe(res => {
        console.log(res);

        if (res) {
          res.rowData.isActive = 0;
          res.rowData.isDeleted = 1;
          this.UserMasterCRUD(res.rowData)
          //this.toastr.success("User is Deleted");

        }
      })

    }
    else if (actionName === 'Assign Role') {
      this.UserRoleForm.reset()
      this.UserRoleForm.patchValue({
        roleDropDown: 0,
      })
      let userRolelist = this.returnUserRoleList(userData)
      let tempRoleList = this.roleList

      this.userRoles = tempRoleList.filter(role => {
        return userRolelist.includes(role.roleName as string)
      })
      if (userRolelist !== null && userRolelist !== undefined) { // Check that userRolelist is not null or undefined
        this.filteredRoleList = this.roleList.filter(res => {
          return userRolelist !== null && userRolelist !== undefined && !userRolelist.includes(res.roleName as string);
        });
      } else {
        // For example, you can consider keeping the original list as-is
        this.filteredRoleList = this.roleList;
      }

      this.UserRoleForm.controls.userData.patchValue(userData)
      this.assignRoleModal = this.modalService.open(this.assignRoleModalContent)



    }
  }


  /**
   * This function handles the real-time display of user selected image on profile picture
   * it also converts the image to base64 at the same time patching it to the formControl 'profileImage'.
   * @param event this is a window event
   */
  public handleProfileImageChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const selectedFile: File = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64String: string = e.target.result;
        this.UserForm.patchValue({
          profileImage: base64String
        })
        this.previewImage = base64String
        base64String != null ? this.UserForm.get('profileImage')?.setValue(base64String) : this.UserForm.get('profileImage')?.setValue('')
      }
      reader.readAsDataURL(selectedFile)
    }
  }



  /**
   * This is a base UserMasterCRUD API that handles all the functionalities such as
   * GET,POST,PUT,DELETE.
   * @param UserMaster This is an empty object decorated to handle the multifunctional UserMasterCRUD api
   */
  public UserMasterCRUD(UserMaster: UserMasterDTO) {
    UserMaster.actionUser = this._userService.User().userId
    UserMaster.companyId = +this.COMPANY_CODE
    this._commonService.getUsersList(UserMaster).subscribe((userlist: UserData) => {
      if (userlist.users[0].activeUserId != 0) {
        this.CreateUserCredentials(userlist.users[0].activeUserId as number)
        if (this.UserForm.controls.roleId.value != 0) {
          let roleData: PaginatedUserRoleCRUD = {
            pageNo: userlist.users[0].pageNo,
            pageSize: userlist.users[0].pageSize,
            rowNum: 0,
            totalCount: 0,
            roleName: '',
            userRoleId: 0,
            userId: userlist.users[0].activeUserId,
            roleId: this.UserForm.controls.roleId.value as number,
            isActive: 1,
            actionUser: this.User.userId,
            isDeleted: 0
          }
          this.UserRoleCRUD(roleData)
          this.UserForm.reset()

        }
      }
      else {
        this.UserForm.reset()
        this.UserForm.controls.userCredential.reset()
        this.editUserModal?.close()
      }
      this.UserMasterlist = userlist.users
      this.filteredUsers = userlist.users.map(user => ({
        Name: `${user.firstName}${user.middleName ? ' ' + user.middleName : ''} ${user.lastName}`,
        Designation: user.designation,
        Phone: user.mobileNo,
        Email: user.emailId,
        Username: user.username,
        CreatedBy: user.createdBy,
        AssignedWorkcenter: user.assignedWC,
        Active: user.isActive,
        AssignedRoles: user.assignedRoles,
        rowData: user
      }))
      this.UserForm.reset()
      this.editUserModal?.close()
    })
  }

  handlePageSizeChange(e: any) {
    this.UserMaster.pageNo = e.currentPage
    this.UserMaster.pageSize = e.pageSize
    //this.router.navigate(['/USRL'], { queryParams: { pageNo: this.UserMaster.pageNo, pageSize: this.UserMaster.pageSize } })

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { pageNo: this.UserMaster.pageNo, pageSize: this.UserMaster.pageSize },
      queryParamsHandling: 'merge', // Use 'merge' to merge with existing query parameters
    });
    this.UserMasterCRUD(this.UserMaster)
  }


  public addUserRole() {
    if (this.UserRoleForm.controls.roleDropDown.value !== 0) {
      let userRole: PaginatedUserRoleCRUD = {
        userRoleId: 0,
        userId: this.UserRoleForm.controls.userData.value.userId,
        roleId: this.UserRoleForm.controls.roleDropDown.value as number,
        actionUser: 0,
        isActive: 1,
        isDeleted: 0,
        pageSize: this.UserMaster.pageSize,
        pageNo: this.UserMaster.pageNo,
        rowNum: 0,
        totalCount: 0,
        roleName: ''
      }
      this.UserRoleCRUD(userRole);
    }
  }

  public deleteRole(rowData: any) {

    let userRole: PaginatedUserRoleCRUD = {
      pageNo: this.UserMaster.pageNo,
      pageSize: this.UserMaster.pageSize,
      rowNum: 0,
      totalCount: 0,
      roleName: '',
      userRoleId: 0,
      userId: this.UserRoleForm.controls.userData.value.userId,
      roleId: rowData.roleId,
      isActive: 0,
      actionUser: this.User.userId,
      isDeleted: 1
    }

    this.UserRoleCRUD(userRole);
  }

  public returnUserRoleList(data: any): string[] {
    return data.assignedRoles?.split(',').map((item: string) => item.trim());
  }

  public UserRoleCRUD(data: PaginatedUserRoleCRUD) {
    data.pageNo = this.UserMaster.pageNo
    data.pageSize = this.UserMaster.pageSize
    data.actionUser = this.User.userId
    this._commonService.userRoleCRUD(data).subscribe((res: UserData) => {

      this.UserMasterlist = res.users


      let currentUser = res.users.filter(user => {
        return user.userId === user.activeUserId
      })

      this.filteredUsers = res.users.map((user: UserMasterDTO) => ({
        Name: `${user.firstName}${user.middleName ? ' ' + user.middleName : ''} ${user.lastName}`,
        AssignedRoles: user.assignedRoles,
        Phone: user.mobileNo,
        Email: user.emailId,
        Username: user.username,
        CreatedBy: user.createdBy,
        AssignedWorkcenter: user.assignedWC,
        Active: user.isActive,
        Designation: user.designation,
        rowData: user
      }))

      this.userRoles = []

      this.userRoles = this.roleList.filter(wc => {
        return this.returnUserRoleList(currentUser[0]).includes(wc.roleName as string)
      })

      this.filteredRoleList = this.roleList.filter(wc => {
        return !this.returnUserRoleList(currentUser[0]).includes(wc.roleName as string)
      })

    })
  }

  public CreateUserCredentials(userId: number) {
    if (this.UserForm.controls.userCredential.controls.userName.value !== null && this.UserForm.controls.userCredential.controls.userPassword.value !== null) {
      console.log('inside validation')
      let userCred: UserCredentials = {
        userId: userId,
        userName: this.UserForm.controls.userCredential.controls.userName.value,
        userPassword: this.UserForm.controls.userCredential.controls.userPassword.value,
        actionUser: this.User.userId
      }

      console.log(userCred);
      this._commonService.GenerateUserCredentials(userCred).subscribe(res => {
        this.UserForm.controls.userCredential.reset()
        this.editUserModal?.close()

        this.route.queryParams.subscribe(res => {

          let userDTO: UserMasterDTO = {
            pageNo: res['pageNo'],
            pageSize: res['pageSize'],
            rowNum: 0,
            totalCount: 0,
            userId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            dob: new Date,
            emailId: '',
            mobileNo: '',
            designation: '',
            isActive: 0,
            isDeleted: 0,
            createdBy: '',
            createdOn: new Date,
            modifiedBy: '',
            modifiedOn: new Date,
            actionUser: this._userService.User().userId,
            profileImage: '',
            activeUserId: 0,
            webRootPath: '',
            profileImageBase64: "",
            username: '',
            assignedWC: '',
            assignedRoles: '',
            companyId: +this.COMPANY_CODE,
            companyName: '',
            roleId: 0
          }
          this.UserMasterCRUD(userDTO);
        })
      })

    } else {
      this.UserForm.controls.userCredential.reset()
      this.editUserModal?.close()

    }
  }

}
