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

  AppVersion = environment.appVersion;
  User = this._userService.User()
  parentMenu: ParentMenu[] = []
  isDisabled = false
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  showSearchList = true;
  searchnotfound = false;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.showSearchList && event.target !== this.searchInput.nativeElement) {
      this.showSearchList = false;
    }
  }

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


  // menuOpened = false
  // MainBody_OnClick() {
  //   const menuBarCollapsed = document.querySelectorAll(".sidebar.toggled");
  //   const body = document.querySelectorAll("#page-top")
  //   body[0].classList.remove("sidebar-toggled")
  //   menuBarCollapsed[0].classList.remove("toggled")
  //   this.menuOpened = !this.menuOpened
  //   console.log(this.menuOpened)
  // }

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


  SearchResult: GlobalSearchDTO[] = []
  Query: GlobalSearchDTO = {
    filteredText: '',
    filterSize: 20,
    searchId: 0,
    searchValue: '',
    valueType: '',
    partDetail: '',
    workOrderDetail: '',
    workItemDetail: ''
  }

  searchTimeout: any;
  searchWithDelay(event: any) {
    this.isDisabled = true;
    const delayMilliseconds = 1000; // Set a delay 1000 milliseconds 
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.Query.filteredText = event.target.value;
      if (this.Query.filteredText == '') {
        this.isDisabled = false;
        this.showSearchList = false;
        this.searchnotfound = false;
      }
      if (this.Query.filteredText != '') {
        this.GetResult(this.Query)
      }
    }, delayMilliseconds);
  }

  getColor(valueType: string): string {
    if (valueType === 'order') {
      return 'AAE272';
    } else if (valueType === 'traveler') {
      return 'F8843A';
    } else {
      return 'A084D2';
    }
  }


  GetResult(Query: GlobalSearchDTO) {
    this._commonService.GetSearchResult(Query).subscribe((response: SearchResultList) => {
      this.SearchResult = response.searchResult
      this.showSearchList = true;
      this.searchnotfound = true;
    });
  }
  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.showSearchList = false;
    this.isDisabled = false;
    this.searchnotfound = false;
    this.searchInput.nativeElement.focus();
  }

  GoToPage(type: string, id: number) {
    this.searchInput.nativeElement.value = '';
    this.isDisabled = false;
    type = type.trim();
    if (type === 'part') {
      this.router.navigate(['/PDTLR'], { queryParams: { id: id } })
    } else if (type === 'order') {
      this.router.navigate(['/WDTLR'], { queryParams: { id: id } })
    } else if (type === 'traveler') {
      this.router.navigate(['/URAD'], { queryParams: { id: id } })
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
  NavigateToSearch() {
    this.searchInput.nativeElement.value = '';
    this.isDisabled = false;
    this.router.navigate(["/GSR"], { queryParams: { filteredText: this.Query.filteredText, filterSize: 0 } })
  }

}
