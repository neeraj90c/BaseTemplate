import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuManage } from 'src/app/interface/ManageMenuDTO';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit {
  constructor(private _commonService: CommonService, private _userService: UserService, public modalService: NgbModal,private confirmmodalserviceService:ConfirmmodalserviceService) { }

  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];

  value:number=0;
  MenuMaster: MenuManage = {
    menuId: 0,
    menuName: '',
    menuCode: '',
    menuDesc: '',
    displayOrder: 0,
    parentMenuId: 0,
    defaultChildMenuId: 0,
    menuIconUrl: '',
    templatePath: '',
    isActive: 0,
    createdBy: '',
    createdOn: new Date(),
    modifiedBy: '',
    modifiedOn: new Date(),
    isDeleted: 0,
    actionUser: this._userService.User().userId
  }

  ParentMenu: MenuManage[] = []

  ChildMenu: MenuManage[] = []

  MenuList: MenuManage[] = [];

  @ViewChild('createMenuModal', { static: false }) menuModalContent!: ElementRef;
  menuModal!: NgbModalRef;


  ngOnInit(): void {
    this.MenuMasterCRUD(this.MenuMaster)
  }

  openMenuModal() {
    this.createMenuForm.reset()
    this.menuModal = this.modalService.open(this.menuModalContent);
    this.createMenuForm.controls.displayOrder.patchValue(this.ParentMenu.length + 1)
  }


  createMenuForm = new FormGroup({
    menuId: new FormControl(0),
    menuName: new FormControl('', [Validators.required]),
    menuCode: new FormControl('', [Validators.required]),
    parentMenu: new FormControl(),
    childMenu: new FormControl(),
    menuIconUrl: new FormControl('', [Validators.required]),
    menuDesc: new FormControl('', [Validators.required]),
    displayOrder: new FormControl(0, [Validators.required]),
    isActive: new FormControl()
  })

  get menuName() {
    return this.createMenuForm.get('menuName')
  }

  get menuCode() {
    return this.createMenuForm.get('menuCode')
  }
  get menuIconUrl() {
    return this.createMenuForm.get('menuIconUrl')
  }
  get menuDesc() {
    return this.createMenuForm.get('menuDesc')
  }
  get displayOrder() {
    return this.createMenuForm.get('displayOrder')
  }


  parentMenuChange() {
    let filteredChildlist
    filteredChildlist = this.ChildMenu.filter(res => {
      return res.parentMenuId == this.createMenuForm.controls.parentMenu.value;
    })
    this.createMenuForm.controls.displayOrder.patchValue(filteredChildlist.length + 1)
  }

  submitForm() {
    Object.values(this.createMenuForm.controls).forEach(control => {
      control.markAsTouched()
    })
    if (this.createMenuForm.valid) {
      let menuMaster = { ...this.MenuMaster }
      let { menuCode, menuDesc, menuId, menuName, childMenu, displayOrder, parentMenu, menuIconUrl } = this.createMenuForm.value
      menuMaster.actionUser = this._userService.User().userId
      menuMaster.menuId = menuId ? menuId as number : 0
      menuMaster.menuName = menuName as string
      menuMaster.menuCode = menuCode as string
      menuMaster.menuDesc = menuDesc as string
      menuMaster.displayOrder = displayOrder as number
      menuMaster.parentMenuId = parentMenu ? parentMenu as number : 0
      menuMaster.defaultChildMenuId = childMenu ? childMenu as number : 0
      menuMaster.menuIconUrl = menuIconUrl as string
      menuMaster.isActive = 1
      this.MenuMasterCRUD(menuMaster);
    }

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




  Update(data: any){
    console.log(data);
    this.menuModal = this.modalService.open(this.menuModalContent)
    this.createMenuForm.patchValue({
      menuId:data.menuId,
      menuName:data.menuName,
      menuCode:data.menuCode,
      parentMenu:data.parentMenu,
      childMenu:data.childMenu,
      menuIconUrl:data.menuIconUrl,
      menuDesc:data.menuDesc,
      displayOrder:data.displayOrder,
      isActive:data.isActive
    })


  }
  Delete(data: any) {
    
    this.confirmmodalserviceService.openSwalModal(data.menuName as string,data).subscribe(res=>{
      if(res){
        res.isActive = 0;
        res.isDeleted = 1;
        res.modifiedBy = ""

        this.MenuMasterCRUD(res)
      }
      
    })

  }
  AddNew(data: MenuManage) {
    console.log(data);
    this.menuModal = this.modalService.open(this.menuModalContent)

  }


  MenuMasterCRUD(menuMaster: MenuManage) {
    this._commonService.menuMasterCRUD(menuMaster).subscribe(res => {
      this.MenuList = res.menus;
      this.ParentMenu = res.menus.filter((res: MenuManage) => {
        return res.parentMenuId === 0
      })
      this.ChildMenu = res.menus.filter((res: MenuManage) => {
        return res.parentMenuId !== 0
      })

      this.createMenuForm.reset()
      this.menuModal?.close()
    });
  }
}
