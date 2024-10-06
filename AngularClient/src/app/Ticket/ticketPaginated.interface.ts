import { SupportTicketDTO } from "../interface/ticket.interface";

export interface GetTicketByUserIdDTO {
    actionUser: string,
    companyId: number,
    PageSize: number,
    PageNo: number,
    Status: string,
    OrderBy: string,
    SearchByTitle: string,
}

export interface TicketListResponse{
    tickets: SupportTicketDTO[]
}