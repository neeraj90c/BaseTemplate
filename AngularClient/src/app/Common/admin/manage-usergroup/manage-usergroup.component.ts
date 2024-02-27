import { Component, ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { UserGroup } from 'src/app/interface/Usergroup';



@Component({
  selector: 'app-manage-usergroup',
  templateUrl: './manage-usergroup.component.html',
  styleUrls: ['./manage-usergroup.component.scss']
})
export class ManageUsergroupComponent implements OnInit {
 constructor(private _commonService: CommonService,  private router: Router,public userService: UserService, public modalService: NgbModal,private confirmmodalserviceService:ConfirmmodalserviceService, private route: ActivatedRoute) { }
 
 /**
 * Initializes the component.
 * Checks for query parameters in the route snapshot.
 * If no parameters are present, navigates to the default route with default pagination parameters.
 * If parameters exist, updates the UserGroupDTO with the values from the query parameters and fetches the user groups.
 */
 ngOnInit(): void {
    // let currentParams = this.route.snapshot.queryParams
    // if (Object.keys(currentParams).length === 0) {
    //   this.router.navigate(['/UGAD'], { queryParams: { pageNo: this.UserGroupDTO.pageNo, pageSize: this.UserGroupDTO.pageSize } })
    // } else {
    //   this.UserGroupDTO.pageSize = currentParams['pageSize'] as number
    //   this.UserGroupDTO.pageNo = currentParams['pageNo'] as number
    // }
    this.UserGroupCrud(this.UserGroupDTO)
}
User = this.userService.User()
userGroupList: UserGroup[] = [];
EditGroupModal !: NgbModalRef;
@ViewChild('usrGroup', { static: false })
userModalContent!: ElementRef;
UserGroupDTO : UserGroup = {
  pageNo: 1,
  pageSize: 10,
  rowNum: 0,
  totalCount: 0,
  groupId: 0,
  groupName: '',
  groupCode: '',
  groupDesc: '',
  isActive: 0,
  createdBy: '',
  createdOn: new Date,
  modifiedBy: '',
  modifiedOn: new Date,
  isDeleted: 0,
  actionUser: this.User.userId
}

UserGroupForm = new FormGroup({
    groupId: new FormControl(0,),
    groupName: new FormControl('', [Validators.required]),
    groupCode: new FormControl('', [Validators.required]),
    groupDescription: new FormControl('', [Validators.required])
  }, Validators.required);


  /**
 * Submits the User Group form.
 * If the form is valid, extracts form control values, constructs a UserGroupDTO object, and triggers the UserGroupCrud method.
 * @remarks Ensure the form controls are properly configured in the UserGroupForm FormGroup.
 */
  SubmitUserGroupForm() {
    Object.values(this.UserGroupForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.UserGroupForm.valid) {
      let userdata = {...this.UserGroupDTO}
      let {groupName, groupDescription , groupId , groupCode} = this.UserGroupForm.controls
      userdata.groupId = groupId.value ? groupId.value : 0
      userdata.groupName= groupName.value
      userdata.groupCode= groupCode.value
      userdata.groupDesc = groupDescription.value
      userdata.isActive = 1
      this.UserGroupCrud(userdata)
    }

  }
  get groupname() : FormControl {
    return this.UserGroupForm.get('groupName') as FormControl
  }
  get groupcode() : FormControl {
    return this.UserGroupForm.get('groupCode') as FormControl
  }
  get groupdescription() : FormControl {
    return this.UserGroupForm.get('groupDescription') as FormControl
  }


  /**
 * Clears the User Group form, resetting all form controls to their initial state.
 * Opens a modal dialog for creating a new User Group using the specified modal template.
 * @remarks Ensure the modalService and userModalContent are properly configured.
 */
  public CreateNewGroup() {
    this.UserGroupForm.reset()
    this.EditGroupModal = this.modalService.open(this.userModalContent)
  }

 
//  This is Comment 

  /**
   * This is an event handler that is triggered from the reusable table app-color-table
   * The event triggered from the table is named 'actionClick', while actionName consists the name of the action sent from parent component
   * While rowData is the row object for delete and edit purpose
   * @param e This argument consists of actionName and Object for the particular row
   */

  public handleActionClick(e: { actionName: string, rowData: UserGroup }) {


    if (e.actionName === 'Edit') {
      

      this.EditGroupModal = this.modalService.open(this.userModalContent)
      this.UserGroupForm.patchValue({
        groupId: e.rowData.groupId,
        groupName: e.rowData.groupName,
        groupCode: e.rowData.groupCode,
        groupDescription: e.rowData.groupDesc,
       
      })
    }
    else if (e.actionName === 'Delete') {
      this.confirmmodalserviceService.openSwalModal(e.rowData.groupName as string,e.rowData).subscribe((res : UserGroup)=>{
        if(res){
          res.isActive = 0;
          res.isDeleted = 1;
          res.modifiedBy = this.User.userId.toLocaleString()
          res.modifiedOn = new Date
          this.UserGroupCrud(res)
        }
        
      })
    }
  }

  
  /**
   * This is a base UserGroupCurd API that handles all the functionalities such as
   * GET,POST,PUT,DELETE.
   * @param  data usergroup is an empty object decorated to handle the multifunctional UserGroupCurd api
   */
  public UserGroupCrud(data: UserGroup) {
    data.actionUser = this.User.userId
    this._commonService.getUsersGroupList(data).subscribe((userGroup) => {
    this.userGroupList = userGroup.groups;
    
       this.UserGroupForm.reset()
       this.EditGroupModal?.close()
     })
   }
 
    // Page handling and query parameters 
  handlePageSizeChange(e: any) {
    this.UserGroupDTO.pageNo = +e.currentPage
    this.UserGroupDTO.pageSize = +e.pageSize
    this.router.navigate(['/UGAD'], { queryParams: { pageNo: this.UserGroupDTO.pageNo, pageSize: this.UserGroupDTO.pageSize } })
    this.UserGroupCrud(this.UserGroupDTO)
  }
}


