import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSearchDTO, SearchResultList } from 'src/app/interface/GlobalSearchDTO';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../services/loader.service';
import { ServerService } from '../../services/server.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../services/common.service';
import { MenuDataItem, ParentMenu } from 'src/app/interface/ManageMenuDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private serverService: ServerService, public _commonService: CommonService, private el: ElementRef, public _userService: UserService, private loaderService: LoaderService, private renderer: Renderer2) { }

  User = this._userService.User()
  parentMenu: ParentMenu[] = []

  ngOnInit(): void {
    this.serverService.validateToken().subscribe({
      next: (res) => {
        let body: ParentMenu = {
          userId: this.User.userId,
          roleId: 0,
          menuId: 0,
          parentMenuId: 0,
          subRoleId: 0,
          subRoleName: '',
          subRoleCode: '',
          subRoleDesc: '',
          displayOrder: 0,
          defaultChildMenuId: 0,
          menuIconUrl: '',
          templatePath: '',
          isParent: 0,
          childrenCount: 0,
          childIsParent: 0
        }
        this.serverService.getMenuForUser(body).subscribe(

          (userMenu:MenuDataItem) => {
            this._userService.authorizedPages = userMenu.items.map((res) => { return res.subRoleCode });

            this.parentMenu = userMenu.items.filter((res) => {
              return res.isParent === 1;
            }).map((res) => {
              res.childMenuList = userMenu.items.filter((usermenu:any) => {
                return usermenu.parentMenuId === res.menuId;
              });
              return res;
            });

          }
        )

      },
      error: (err) => {
        this.Logout()
      }
    })

    

  }


  Logout() {
    this.serverService.SignOutUser()
  }

  trimOutsideDoubleQuotes(input: string): string {
    const match = input.match(/"([^"]+)"/); // Match content inside double quotes
    if (match) {
      return match[1]; // Return the content inside double quotes
    } else {
      return input; // Return the original string if no double quotes are found
    }
  }



  menuBarCollapsed = false;

  toggleProperties() {
    this.menuBarCollapsed = !this.menuBarCollapsed;
    const body = document.querySelector('#page-top');
    const menuBar = document.querySelector('.sidebar');

    if (body && menuBar) {
      if (this.menuBarCollapsed) {
        body.classList.remove('sidebar-toggled');
        menuBar.classList.remove('toggled');
      } else {
        body.classList.add('sidebar-toggled');
        menuBar.classList.add('toggled');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const clickedOnSidebar = (event.target as HTMLElement).closest('#accordionSidebar');
    const clickedOnToggle = (event.target as HTMLElement).closest('.sidebarToggler');
    const clickedOnSmallbutton = (event.target as HTMLElement).closest('#sidebarToggleTop');

    if (clickedOnSidebar || clickedOnToggle) {
      // Clicked inside the sidebar or on the toggler, no need to toggle
      return;
    }

    const clickedInside = this.el.nativeElement.contains(event.target);

    if (clickedInside && this.menuBarCollapsed) {
      this.toggleProperties();
      if(clickedOnSmallbutton){
        this.toggleProperties();

      }
    }
    
  }



 




 


  navigateTo(menuCode: string) {
    this.router.navigate([`/${menuCode}`])
  }

  showChildMenu(menuid: any, Menu: any) {
    const element = this.el.nativeElement.querySelector(`#masterNav_${menuid}`);
    if (Menu.length <= 0) {
      this.renderer.setStyle(element, 'display', 'none');
    }
    else {
      this.renderer.setStyle(element, 'display', 'block');
    }
  }

  hideChildMenu(menuid: any) {
    const element = this.el.nativeElement.querySelector(`#masterNav_${menuid}`);
    this.renderer.setStyle(element, 'display', 'none');
  }


}
