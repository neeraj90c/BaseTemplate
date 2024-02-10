import { Component } from '@angular/core';
import { SubRole } from 'src/app/interface/SubRolesDTO';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/interface/UserRoleDTO';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-manage-subroles',
  templateUrl: './manage-subroles.component.html',
  styleUrls: ['./manage-subroles.component.scss']
})
export class ManageSubrolesComponent {
  constructor(private _commonService: CommonService, public _userService: UserService, private route: ActivatedRoute) {
  }
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
  ngOnInit(): void {
    this.RolesCrud(this.UserRoleDTO)
    //this.SubRolesMapping(this.SubRolesDTO)
   
  }
  User = this._userService.User()

  label: string = ''

  RoleList: UserRole[] = [];

  subroleList: SubRole[] = [];

  ParentMenu: SubRole[] = [];

  ChildMenu: SubRole[] = [];

  SubRolesDTO: SubRole = {
    menuId: 0,
    menuName: '',
    menuCode: '',
    menuDesc: '',
    parentMenuId: 0,
    roleId: 0,
    displayOrder: 0,
    subRoleId: 0,
    hasAccess: false,
    actionUser: this.User.userId,
    isActive: 0,
    isDeleted: 0,
    
  }

  UserRoleDTO: UserRole = {
    roleId: 0,
    roleName: '',
    roleCode: '',
    roleDesc: '',
    isActive: 0,
    createdBy: '',
    createdOn: new Date(),
    modifiedBy: '',
    modifiedOn: new Date(),
    isDeleted: 0,
    actionUser: this._userService.User().userId,
    pageNo: 1,
    pageSize: 10,
    rowNum: 0,
    totalCount: 0
  }



  RoleFormDropdown = new FormGroup({
    RoleId: new FormControl(0)
  },
  );




  UserRoleFetch() {
    this.SubRolesDTO.roleId = this.RoleFormDropdown.controls.RoleId.value as number
    this.SubRolesMapping(this.SubRolesDTO);
   
  }




  // *****  Functionality for Expanding table open-close all and individual STARTS ****//
  isMenuExpanded: boolean = true;
  currentMenuID: any = 0
  ExpandMenuMasterDataAllRowOnClick() {
    this.isMenuExpanded = !this.isMenuExpanded;
    if (!this.isMenuExpanded) {
      this.currentMenuID = null
    }
  }


  ExpandMenuMasterDataRowOnClick(menuID: any) {
    if (this.currentMenuID === menuID) {
      this.currentMenuID = null;
    } else {
      this.currentMenuID = menuID;
    }

  }


  // *****  Functionality for Expanding table open-close all and individual ENDS ****//


/**
 * API calling functionalities for give user Roles data.
 * @param data  this is empty parameter for calling API
 */
  public RolesCrud(data: UserRole) {
    this._commonService.getRoleList(data).subscribe(res => {
      this.RoleList = res.roles
      this.SubRolesDTO.roleId = this.RoleList[0].roleId as number
      this.RoleFormDropdown.controls.RoleId.patchValue(this.SubRolesDTO.roleId)
      this.SubRolesMapping(this.SubRolesDTO)
    })

  }

  /**
   * Api Calling functionalitis for mapping exponding table parent child data.
   * @param data  this is empty parameter for calling API
   */

  public SubRolesMapping(data: SubRole) {
    this._commonService.getSubRoles(data).subscribe((subroleData) => {
      this.subroleList = subroleData.subRoles;


      this.ParentMenu = subroleData.subRoles.filter((subroleData: SubRole) => {
        return subroleData.parentMenuId === 0 ;
      });

      this.ChildMenu = subroleData.subRoles.filter((subroleData: SubRole) => {
        return subroleData.parentMenuId !== 0;
      });

    })
    this.label = this.RoleList.filter(res => {
      return res.roleId == this.RoleFormDropdown.controls.RoleId.value
    })[0]?.roleName as string

  }

/**
 * Handles the Roles using checkbox update function
 * @param SubRolesDTO  this is empty parameter for calling API
 * @param e this is a event
 */
  updateCheckboxState(SubRolesDTO: SubRole, e: any) {

    if (SubRolesDTO.parentMenuId == 0) {

      const subrolelist = this.subroleList.filter(res => {
        return res.parentMenuId == SubRolesDTO.menuId

      })


      if (e.target.checked) {
        SubRolesDTO.isActive = 1
        SubRolesDTO.isDeleted = 0
        SubRolesDTO.actionUser = this.User.userId
        this.mapRoleToMenu(SubRolesDTO)

        subrolelist.map(res => {
          res.isActive = 1,
            res.isDeleted = 0
          res.actionUser = this.User.userId
          this.mapRoleToMenu(res)


        })
      } else {

        SubRolesDTO.isActive = 0
        SubRolesDTO.isDeleted = 1
        SubRolesDTO.actionUser = this.User.userId
        this.mapRoleToMenu(SubRolesDTO)

        subrolelist.map(res => {
          res.isActive = 0,
            res.isDeleted = 1,
            res.actionUser = this.User.userId
          this.mapRoleToMenu(res)
        })
      }
    } else if (SubRolesDTO.parentMenuId != 0) {
      if (e.target.checked) {
        SubRolesDTO.isActive = 1
        SubRolesDTO.isDeleted = 0
        SubRolesDTO.actionUser = this.User.userId
        this.mapRoleToMenu(SubRolesDTO)
      } else {
        SubRolesDTO.isActive = 0
        SubRolesDTO.isDeleted = 1
        SubRolesDTO.actionUser = this.User.userId
        this.mapRoleToMenu(SubRolesDTO)
      }

    }

  }

  /**
   * API calling functionalities for mapping subrolelist.
   * @param data  this is empty parameter for calling API
   */
  public mapRoleToMenu(data: SubRole) {
    this._commonService.getSubRoles(data).subscribe(res => {
    this.SubRolesMapping(this.SubRolesDTO)
    });
  }

}



