import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyMasterDTO, CompanyList } from 'src/app/interface/CompanyMasterDTO';
import { GlobalSearchDTO, SearchResultList } from 'src/app/interface/GlobalSearchDTO';
import { MenuManage, MenuManageDTO } from 'src/app/interface/ManageMenuDTO';
import { MenuRole, MenuRoleDTO } from 'src/app/interface/MenuRolesDTO';
import { ProjectMasterDTO, ProjectData, TagDTO, TagList, ProjectTagsDTO, ProjectTagsMap } from 'src/app/interface/ProjectMasterDTO';
import { ProjectRoles, ProjectRolesDTO } from 'src/app/interface/ProjectRolesDTO';
import { SubRole, SubRolesDTO } from 'src/app/interface/SubRolesDTO';
import { TemplateDTO, TemplateList, TemplateDetailDTO, TemplateDetail } from 'src/app/interface/TemplateDTO';
import { PaginatedUserRoleCRUD } from 'src/app/interface/User';
import { UserCredentials, UserData, UserMasterDTO } from 'src/app/interface/UserMasterDTO';
import { RoleList, RolesDTO, UserRoleDTO, UserRoleList } from 'src/app/interface/UserRoleDTO';
import { UserGroup, userGroupDTO } from 'src/app/interface/Usergroup';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class CommonService {


  private readonly BaseURL = environment.apiURL;

  constructor(private _http: HttpClient) { }
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"]

  getUsersList(UserMaster: UserMasterDTO): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/users/UserMasterCrud`, UserMaster);
  }
  
  employeeStatusUpdate(UserMaster: UserMasterDTO): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/user/UserStatusUpdate`, UserMaster);
  }

  GenerateUserCredentials(userCredentials: UserCredentials): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/users/GenerateUserCredentials`, userCredentials);
  }
  
  userRoleCRUD(data: UserRoleDTO): Observable<UserRoleList> {
    return this._http.post<UserRoleList>(`${this.BaseURL}/users/UserRoleCRUD`, data)
  }
  menuMasterCRUD(data: MenuManage): Observable<MenuManageDTO> {
    return this._http.post<MenuManageDTO>(`${this.BaseURL}/menus/MenuMasterCRUD`, data)
  }
  getRoleList(data: RolesDTO): Observable<RoleList> {
    return this._http.post<RoleList>(`${this.BaseURL}/admin/RolesCRUD`, data);
  }
  getSubRoles(data : SubRole) : Observable<SubRolesDTO>{
    return this._http.post<SubRolesDTO>(`${this.BaseURL}/roles/SubRolesMapping`,data);
  }
  getUsersGroupList(data: UserGroup) : Observable<userGroupDTO>{
    return this._http.post<userGroupDTO>(`${this.BaseURL}/roles/UserGroupCRUDPaginated`,data);
  }
  companyCRUD(data:CompanyMasterDTO):Observable<CompanyList>{
    return this._http.post<CompanyList>(`${this.BaseURL}/company/GetCompanyList`,data);
  }
}


