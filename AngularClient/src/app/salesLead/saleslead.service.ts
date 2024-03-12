import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AssignLeadDTO, LeadActivityList, LeadAsigneeList, ProjectList, SalesLeadDTO, SalesLeadList } from '../interface/leadgeneration.interface';
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

  createSalesLead(data: SalesLeadDTO): Observable<SalesLeadList> {
    return this.http.post<SalesLeadList>(`${this.BaseURL}/SalesLead/CreateLead`, data);
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

}
