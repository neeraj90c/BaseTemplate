import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FilteredUserList, UserCredentials, UserData, UserMasterDTO } from 'src/app/interface/UserMasterDTO';
import { UserService } from 'src/app/services/user.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { environment } from "../../../../environments/environment";
import { CommonService } from '../../services/common.service';
import { notEqualToZeroValidator } from 'src/app/validators/validators';
import { RoleList, RolesDTO, UserRoleDTO } from 'src/app/interface/UserRoleDTO';
import { CompanyMasterDTO } from 'src/app/interface/CompanyMasterDTO';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  COMPANY_CODE = environment.COMPANY_CODE
  constructor(private _commonService: CommonService, public _userService: UserService, public modalService: NgbModal, private router: Router, private route: ActivatedRoute, private confirmmodalserviceService: ConfirmmodalserviceService, private toastr: ToastrService,private renderer: Renderer2) { }
  WCColors = this._commonService.WCColors
  User = this._userService.User()
  @ViewChild('userListModal', { static: false }) userModalContent!: ElementRef;
  editUserModal!: NgbModalRef;


  @ViewChild('assignRoleModalContent', { static: false }) assignRoleModalContent!: ElementRef;
  assignRoleModal!: NgbModalRef;

  @ViewChild('userlist')  userList!: ElementRef;


  filteredUsers: FilteredUserList[] = []
  filteredUserRoleList: UserRoleDTO[] = [];
  filteredRoleList: RolesDTO[] = [];
  UserMasterlist: UserMasterDTO[] = []
  roleList: RolesDTO[] = [];
  UserMaster: UserMasterDTO = {
    actionUser: 0,
    activeUserId: 0,
    assignedWC: '',
    companyId: 0,
    companyName: '',
    createdBy: '',
    createdOn: new Date,
    designation: '',
    dob: new Date,
    emailId: '',
    firstName: '',
    isActive: 0,
    isDeleted: 0,
    lastName: '',
    middleName: '',
    mobileNo: '',
    modifiedBy: '',
    modifiedOn: new Date,
    profileImage: '',
    profileImageBase64: '',
    roleName: '',
    userId: 0,
    username: '',
    webRootPath: ''
  };
  previewImage: string = '';
  RoleDTO: RolesDTO = {
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

  CompanyList: CompanyMasterDTO[] = []
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

  UserRole: UserRoleDTO = {
    roleName: '',
    userRoleId: 0,
    userId: 0,
    roleId: 0,
    isActive: 0,
    actionUser: 0,
    isDeleted: 0
  }


  ngOnInit(): void {
    this._commonService.getRoleList(this.RoleDTO).subscribe((res: RoleList) => {
      this.roleList = res.roles
    })
    this.GetCompanyList(this.CompanyDTO)
    this.UserMasterCRUD(this.UserMaster)
  }

  /**
   * This is the main FormGroup used for User form
   */
  UserForm = new FormGroup({
    profileImage: new FormControl(''),
    userId: new FormControl(0,),
    firstname: new FormControl('', [Validators.required]),
    middlename: new FormControl('',),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    mobileNo: new FormControl(''),
    dob: new FormControl<any>([Validators.required]),
    designation: new FormControl(''),
    roleId: new FormControl(0, [Validators.required, notEqualToZeroValidator]),
    companyId: new FormControl(0, [Validators.required, notEqualToZeroValidator]),
    userCredential: new FormGroup({
      userName: new FormControl(''),
      userPassword: new FormControl('')
    })

  })


  UserRoleForm = new FormGroup({
    roleDropDown: new FormControl(0),
    userId: new FormControl(0)
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
  get userCompanyCtrl(): FormControl {
    return this.UserForm.get('companyId') as FormControl;
  }



  /**
   * This function will will reset the userForm and open the modal
   */
  public createNewUser() {
    this.UserForm.reset()
    this.UserForm.patchValue({
      roleId: 0,
      companyId: 0
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
      let { profileImage, userId, firstname, middlename, lastname, email, mobileNo, dob, designation, companyId } = this.UserForm.controls
      usermaster.profileImageBase64 = this.previewImage
      usermaster.userId = userId.value ? userId.value : 0
      usermaster.companyId = companyId.value ? companyId.value : 0
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
    if (this.UserForm.controls.userCredential.valid && this.UserForm.controls.userId.value != 0 && this.UserForm.controls.userId.value != null) {
      this.CreateUserCredentials(this.UserForm.controls.userId.value as number)
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
    let userData: UserMasterDTO = rowData.rowData

    if (actionName === 'Edit') {
      this.previewImage = ""
      this.editUserModal = this.modalService.open(this.userModalContent)
      this.UserForm.patchValue({
        profileImage: 'data:image/png;base64,'+userData.profileImageBase64,
        userId: userData.userId,
        firstname: userData.firstName,
        middlename: userData.middleName,
        lastname: userData.lastName,
        email: userData.emailId,
        designation: userData.designation,
        mobileNo: userData.mobileNo,
        dob: formatDate(userData.dob, 'yyyy-MM-dd', 'en'),
        roleId: 0,
        companyId: userData.companyId,
        userCredential: { userName: userData.username }
      })
      this.UserForm.get('roleId')?.disable();
      this.previewImage = userData.profileImageBase64 ? 'data:image/png;base64,'+userData.profileImageBase64 : ""
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

      let ur: UserRoleDTO = {
        roleName: '',
        userRoleId: 0,
        userId: userData.userId,
        roleId: 0,
        isActive: 0,
        actionUser: this.User.userId,
        isDeleted: 0
      }
      this.UserRoleForm.patchValue({
        userId: userData.userId
      })
      this.UserRoleCRUD(ur)
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
    this._commonService.getUsersList(UserMaster).subscribe((userlist: UserData) => {
      if (userlist.users[0].activeUserId != 0) {
        this.CreateUserCredentials(userlist.users[0].activeUserId as number)
        if (this.UserForm.controls.roleId.value != 0) {
          let roleData: UserRoleDTO = {
            
            roleName: '',
            userRoleId: 0,
            userId: userlist.users[0].activeUserId,
            roleId: this.UserForm.controls.roleId.value as number,
            isActive: 1,
            actionUser: this.User.userId,
            isDeleted: 0,
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
      const tbodyElement: HTMLTableSectionElement = this.userList.nativeElement;

      for (let i = 0; i < this.UserMasterlist.length; i++) {
        const tr = this.renderer.createElement('tr');
    
        // Set the inner HTML for the row
        tr.innerHTML = `
          <td class="dtr-control sorting_1" style="border-left: 5px solid #${this.WCColors[i]};">${(i + 1).toString()}</td>
          <td>${this.UserMasterlist[i].firstName} ${this.UserMasterlist[i].middleName} ${this.UserMasterlist[i].lastName}</td>
          <td>${this.UserMasterlist[i].companyName}</td>
          <td>${this.UserMasterlist[i].designation}</td>
          <td>${this.UserMasterlist[i].mobileNo}</td>
          <td>${this.UserMasterlist[i].emailId}</td>
          <td>${this.UserMasterlist[i].username}</td>
          <td>${this.UserMasterlist[i].createdBy}</td>
          <td class="col-3">${this.UserMasterlist[i].roleName}</td>
          <td>
            <input type="checkbox" id="employeeIsActive"${this.UserMasterlist[i].isActive ? ' checked' : ''} onchange="UserMaster.EmployeeStatusUpdate(this, '${encodeURIComponent(JSON.stringify(this.UserMasterlist[i]))}')" >
          </td>
          <td class="text-center">
            <div class="btn-group dots_dropdown">
              <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-right shadow-lg">
                <!-- Your dropdown items here -->
              </div>
            </div>
          </td>
        `;
    
        // Append the row to the tbody
        this.renderer.appendChild(tbodyElement, tr);
      }

      this.filteredUsers = userlist.users.map(user => ({
        Name: `${user.firstName}${user.middleName ? ' ' + user.middleName : ''} ${user.lastName}`,
        Designation: user.designation,
        Phone: user.mobileNo,
        Email: user.emailId,
        Username: user.username,
        CreatedBy: user.createdBy,
        AssignedWorkcenter: user.assignedWC,
        Active: user.isActive,
        AssignedRoles: user.roleName,
        Company: user.companyName,
        rowData: user
      }))
      this.UserForm.reset()
      this.editUserModal?.close()
    })
  }

  handlePageSizeChange(e: any) {
    //this.UserMaster.pageNo = e.currentPage
    //this.UserMaster.pageSize = e.pageSize
    //this.router.navigate(['/USRL'], { queryParams: { pageNo: this.UserMaster.pageNo, pageSize: this.UserMaster.pageSize } })

    // this.router.navigate(['.'], {
    //   relativeTo: this.route,
    //   queryParams: { pageNo: this.UserMaster.pageNo, pageSize: this.UserMaster.pageSize },
    //   queryParamsHandling: 'merge', // Use 'merge' to merge with existing query parameters
    // });
    // this.UserMasterCRUD(this.UserMaster)
  }


  public returnUserRoleList(data: any): string[] {
    return data.assignedRoles?.split(',').map((item: string) => item.trim());
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
        this.UserMasterlist = res.users
        this.filteredUsers = res.users.map(user => ({
          Name: `${user.firstName}${user.middleName ? ' ' + user.middleName : ''} ${user.lastName}`,
          Designation: user.designation,
          Phone: user.mobileNo,
          Email: user.emailId,
          Username: user.username,
          CreatedBy: user.createdBy,
          AssignedWorkcenter: user.assignedWC,
          Active: user.isActive,
          AssignedRoles: user.roleName,
          Company: user.companyName,
          rowData: user
        }))
        this.UserForm.reset()
        this.editUserModal?.close()


      })

    } else {
      this.UserForm.controls.userCredential.reset()
      this.editUserModal?.close()

    }
  }

  GetCompanyList(data: CompanyMasterDTO) {
    this._commonService.companyCRUD(data).subscribe(res => {
      this.CompanyList = res.companies
    })
  }

  UserRoleCRUD(data: UserRoleDTO) {
    this._commonService.userRoleCRUD(data).subscribe(res => {
      this.filteredUserRoleList = res.userRole;
      this.filteredRoleList = this.roleList.filter(role => {
        return !res.userRole.some((userRole) => userRole.roleId === role.roleId)
      })

      let user:UserMasterDTO ={
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
        actionUser: 0,
        profileImage: '',
        activeUserId: 0,
        webRootPath: '',
        profileImageBase64: '',
        username: '',
        assignedWC: '',
        companyId: 0,
        companyName: '',
        roleName: ''
      }
      this.UserMasterCRUD(user)
    })
  }
  AddRole() {
    if (this.UserRoleForm.valid) {

      let userRoleForm = { ...this.UserRoleForm.value }

      let userRoleMapping: UserRoleDTO = {
        roleName: '',
        userRoleId: 0,
        userId: userRoleForm.userId as number,
        roleId: userRoleForm.roleDropDown as number,
        isActive: 1,
        actionUser: this.User.userId,
        isDeleted: 0
      }
      this.UserRoleCRUD(userRoleMapping)
    }
  }

  DeleteUserRole(role: UserRoleDTO) {
    role.actionUser = this.User.userId
    role.isActive = 0
    role.isDeleted = 1
    this.UserRoleCRUD(role);
  }

}
