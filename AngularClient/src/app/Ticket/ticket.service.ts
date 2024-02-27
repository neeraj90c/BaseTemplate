import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ClientUserTicketList, ClientWorkListDTO, DashboardDTO, DashboardInputParams, SupportTicketDTO, TicketActivityList, TicketAsigneeDTO, TicketAsigneeList, TicketCommentDTO, TicketList, UserList } from '../interface/ticket.interface';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private BaseURL = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) { }


  getClientWorklist(data: any): Observable<ClientWorkListDTO> {
    return this.http.post<ClientWorkListDTO>(`${this.BaseURL}/Ticket/GetClientWorkList`, data);
  }

  navigateToViewTicket(id: number): void {
    this.router.navigate(['view-ticket', id]);
  }

  getTicketDetailsById(data: { ticketId: number }): Observable<TicketList> {
    return this.http.post<TicketList>(`${this.BaseURL}/Ticket/TicketDetails`, data);
  }
  getTicketResolverList(data: { actionUser: number }): Observable<TicketList> {
    return this.http.post<TicketList>(`${this.BaseURL}/Ticket/GetTicketResolverList`, data);
  }
  getTicketComments(data: TicketCommentDTO): Observable<TicketActivityList> {
    return this.http.post<TicketActivityList>(`${this.BaseURL}/Ticket/TicketComments`, data);
  }
  getAllByTicketId(data: { ticketId: number }): Observable<TicketAsigneeList> {
    return this.http.post<TicketAsigneeList>(`${this.BaseURL}/TicketAsignee/GetAllByTicketId`, data);
  }
  getAllUserList(): Observable<UserList> {
    return this.http.get<UserList>(`${this.BaseURL}/users/GetAllUserList`);
  }

  takeOverTicket(data:{ticketId: number, actionUser: string, assignedTo: string}):Observable<SupportTicketDTO> {
    return this.http.post<SupportTicketDTO>(`${this.BaseURL}/Ticket/AssignToUser`,data);
  }

  ticketStatusUpdate(data:TicketAsigneeDTO):Observable<TicketAsigneeList>{
    return this.http.post<TicketAsigneeList>(`${this.BaseURL}/TicketAsignee/UpdateStatus`,data)
  }
  assignTicketToUser(data:TicketAsigneeDTO):Observable<TicketAsigneeList>{
    return this.http.post<TicketAsigneeList>(`${this.BaseURL}/TicketAsignee/Insert`,data)
  }
  reopenTicket(data:{ ticketId: number, actionUser: number }):Observable<any> {
    return this.http.post<any>(`${this.BaseURL}/ticket/ReOpenTicket`,data)
  }
  forceCloseTicket(data:SupportTicketDTO):Observable<SupportTicketDTO> {
    return this.http.post<SupportTicketDTO>(`${this.BaseURL}/ticket/ForceCloseTicket`,data)
  }
  manageTicket(data:SupportTicketDTO):Observable<TicketList> {
    return this.http.post<TicketList>(`${this.BaseURL}/ticket/ManageTicket`,data)
  }

  getClientUserTicketList(data:{actionUser: number, companyId: number}):Observable<ClientUserTicketList> {
    return this.http.post<ClientUserTicketList>(`${this.BaseURL}/Ticket/ClientUserTicketList`,data)
  }
  getAdminDashboard(data:DashboardInputParams):Observable<DashboardDTO>{
    return this.http.post<DashboardDTO>(`${this.BaseURL}/ticket/GetAdminDashboardData`,data)
  }


}