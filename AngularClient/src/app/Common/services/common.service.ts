import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalSearchDTO, SearchResultList } from 'src/app/interface/GlobalSearchDTO';
import { MenuManage, MenuManageDTO } from 'src/app/interface/ManageMenuDTO';
import { MenuRole, MenuRoleDTO } from 'src/app/interface/MenuRolesDTO';
import { ProjectData, ProjectMasterDTO, ProjectTagsDTO, ProjectTagsMap, TagDTO, TagList } from 'src/app/interface/ProjectMasterDTO';
import { ProjectRoles, ProjectRolesDTO } from 'src/app/interface/ProjectRolesDTO';
import { SubRole, SubRolesDTO } from 'src/app/interface/SubRolesDTO';
import { TemplateDTO, TemplateDetail, TemplateDetailDTO, TemplateList } from 'src/app/interface/TemplateDTO';
import { PaginatedUserRoleCRUD } from 'src/app/interface/User';
import { UserCredentials, UserData, UserMasterDTO } from 'src/app/interface/UserMasterDTO';
import { UserRole, UserRoleDTO } from 'src/app/interface/UserRoleDTO';
import { UserGroup, userGroupDTO } from 'src/app/interface/Usergroup';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class CommonService {


  private readonly BaseURL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  getUsersList(UserMaster: UserMasterDTO): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/user/PaginatedUserMasterCrud`, UserMaster);
  }
  employeeStatusUpdate(UserMaster: UserMasterDTO): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/user/UserStatusUpdate`, UserMaster);
  }

  GenerateUserCredentials(userCredentials: UserCredentials): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/user/GenerateUserCredentials`, userCredentials);
  }
  
  getMenuRoleList(data: MenuRole): Observable<MenuRoleDTO> {
    return this._http.post<MenuRoleDTO>(`${this.BaseURL}/admin/MenuRoleMapping`, data)
  }

  TemplateCRUD(templateData:TemplateDTO):Observable<TemplateList>{
    return this._http.post<TemplateList>(`${this.BaseURL}/admin/TemplateCRUD`, templateData)
  }

  GetProjectsList(ProjectMaster: ProjectMasterDTO): Observable<ProjectData> {
    return this._http.post<ProjectData>(`${this.BaseURL}/admin/ManageProject`, ProjectMaster);
  }
  
  GetTagList(Tag: TagDTO): Observable<TagList> {
    return this._http.post<TagList>(`${this.BaseURL}/admin/ManageTag`, Tag);
  }

  GetCreateTemplateById(templateData:TemplateDetailDTO):Observable<TemplateDetail>{
    return this._http.post<TemplateDetail>(`${this.BaseURL}/admin/GetCreateTemplateById`, templateData)
  }

 GetSearchResult(Query: GlobalSearchDTO): Observable<SearchResultList> {
    return this._http.post<SearchResultList>(`${this.BaseURL}/globalsearch/GetSearchResult`, Query)
  }
  
  ProjectRolesCRUD(projectRolesData: ProjectRoles): Observable<ProjectRolesDTO> {
    return this._http.post<ProjectRolesDTO>(`${this.BaseURL}/admin/ManageProjectRole`, projectRolesData)
  }

  GetProjectTags(ProjectTag: ProjectTagsDTO): Observable<ProjectTagsMap> {
    return this._http.post<ProjectTagsMap>(`${this.BaseURL}/admin/ManageProjectTags`, ProjectTag);
  }
  
  userRoleCRUD(data: PaginatedUserRoleCRUD): Observable<UserData> {
    return this._http.post<UserData>(`${this.BaseURL}/roles/PaginatedUserRoleCRUD`, data)
  }
  menuMasterCRUD(data: MenuManage): Observable<MenuManageDTO> {
    return this._http.post<MenuManageDTO>(`${this.BaseURL}/menus/MenuMasterCRUD`, data)
  }
  getRoleList(data: UserRole): Observable<UserRoleDTO> {
    return this._http.post<UserRoleDTO>(`${this.BaseURL}/roles/RolesCRUD`, data);
  }
  getSubRoles(data : SubRole) : Observable<SubRolesDTO>{
    return this._http.post<SubRolesDTO>(`${this.BaseURL}/roles/SubRolesMapping`,data);
  }
  getUsersGroupList(data: UserGroup) : Observable<userGroupDTO>{
    return this._http.post<userGroupDTO>(`${this.BaseURL}/roles/UserGroupCRUDPaginated`,data);
  }
}


