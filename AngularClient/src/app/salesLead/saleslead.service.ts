import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AssignLeadDTO, GetWorkListDTO, LeadActivityList, LeadAsigneeDTO, LeadAsigneeList, LeadContactDetail, LeadContactDetailList, LeadResolverList, LeadWorkList, ProjectList, SalesLeadDTO, SalesLeadList } from '../interface/leadgeneration.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesleadService {

  private BaseURL = environment.apiURL;
  constructor(private http: HttpClient, private router: Router) { }

  navigateToViewLead(id: number): void {
    this.router.navigate(['view-lead', id]);
  }

  createSalesLead(data: SalesLeadDTO): Observable<SalesLeadDTO> {
    return this.http.post<SalesLeadDTO>(`${this.BaseURL}/SalesLead/CreateLead`, data);
  }
  deleteSalesLead(leadID: number, actionUser: number): Observable<SalesLeadList> {
    return this.http.delete<SalesLeadList>(`${this.BaseURL}/SalesLead/DeleteLead/${leadID}/${actionUser}`)
  }

  updateSalesLead(data: SalesLeadDTO): Observable<SalesLeadList> {
    return this.http.post<SalesLeadList>(`${this.BaseURL}/SalesLead/UpdateLead`, data);
  }
  getSalesLeadByLeadId(leadId: number): Observable<SalesLeadDTO> {
    return this.http.get<SalesLeadDTO>(`${this.BaseURL}/SalesLead/ReadLeadByLeadId/${leadId}`);
  }
  getAllSalesLead(data:{actionUser:number,companyId:number}): Observable<SalesLeadList> {
    return this.http.post<SalesLeadList>(`${this.BaseURL}/SalesLead/ReadAll`,data);
  }

  getAllProjectList(): Observable<ProjectList>{
    return this.http.get<ProjectList>(`${this.BaseURL}/SalesLead/ReadAllProjectList`);
  }
  getLeadActivityByLeadId(leadId: number): Observable<LeadActivityList>{
    return this.http.get<LeadActivityList>(`${this.BaseURL}/LeadActivity/GetAllActivityByLeadId/${leadId}`);
  }
  getLeadAssigneesByLeadId(leadId:number): Observable<LeadAsigneeList>{
    return this.http.get<LeadAsigneeList>(`${this.BaseURL}/SalesLead/GetAssigneeListByLeadId/${leadId}`)
  }

  assignLeadToUser(data:{lAid: number,leadId: number,assignedTo: string,aDesc: string,aStatus: string,actionUser: number}):Observable<void>{
    return this.http.post<void>(`${this.BaseURL}/SalesLead/AssignLead`,data)
  }

  insertLeadActivity(data:{leadId: number,leadComments: string,actionUser: number}): Observable<LeadAsigneeList>{
    return this.http.post<LeadAsigneeList>(`${this.BaseURL}/LeadActivity/CreateActivity`,data)
  }

  getLeadResolverList():Observable<LeadResolverList>{
    return this.http.get<LeadResolverList>(`${this.BaseURL}/SalesLead/GetLeadResolverList`)
  }

  leadStatusUpdate(data:LeadAsigneeDTO):Observable<LeadAsigneeList>{
    return this.http.post<LeadAsigneeList>(`${this.BaseURL}/SalesLead/UpdateStatus`,data)
  }

  getLeadWorkList(data:GetWorkListDTO):Observable<LeadWorkList>{
    return this.http.post<LeadWorkList>(`${this.BaseURL}/SalesLead/GetLeadWorklist`,data)
  }
  
  salesLeads_AssignToUser(data:AssignLeadDTO):Observable<SalesLeadDTO>{
    return this.http.post<SalesLeadDTO>(`${this.BaseURL}/SalesLead/SalesLeads_AssignToUser`,data)
  }

  salesLeads_ForceClose(data:AssignLeadDTO):Observable<SalesLeadDTO>{
    return this.http.post<SalesLeadDTO>(`${this.BaseURL}/SalesLead/SalesLead_Forceclose`,data)
  }
  leadContactInsert(data:LeadContactDetail):Observable<LeadContactDetailList>{
    return this.http.post<LeadContactDetailList>(`${this.BaseURL}/SalesLead/LeadContactInsert`,data)
  }
  leadContactReadByLeadId(data:LeadContactDetail):Observable<LeadContactDetailList>{
    return this.http.post<LeadContactDetailList>(`${this.BaseURL}/SalesLead/LeadContactReadByLeadId`,data)
  }
}
