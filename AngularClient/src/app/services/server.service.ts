import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenResponse, UserLoginDTO, UserResponseDTO } from '../interface/User';
import { MenuDataItem, ParentMenu } from '../interface/ManageMenuDTO';
import { UserRole, UserRoleDTO } from '../interface/UserRoleDTO';




@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly BaseURL = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated() {
    if (localStorage.getItem('access_token') != null || localStorage.getItem('access_token') != undefined) {
      return true;
    } else {
      return false
    }
  }

  SignOutUser() {
    this.router.navigate(['/login'])
    localStorage.clear()
    //this.msalService.logout().subscribe(() => { })
  }

  getMenuForUser(data: ParentMenu): Observable<MenuDataItem> {
    return this.http.post<MenuDataItem>(`${this.BaseURL}/menus/GetMenuForUser`, data);
  }//

  userlogin(data: UserLoginDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.BaseURL}/users/auth`, data);
  }//

  validateToken() {
    return this.http.get<TokenResponse>(`${this.BaseURL}/users/ValidateToken`);
  }//



}
