
export interface SupportTicketDTO {
    ticketId: number;
    title: string;
    ticketDesc: string;
    ticketType: string;
    category: string;
    tagList: string;
    assignedTo: string;
    ticketStatus: string;
    ticketPriority: string;
    affectsCustomer: string;
    appVersion: string;
    dueDate: Date | null;
    estimatedDuration: string;
    actualDuration: string;
    targetDate: Date | null;
    resolutionDate: Date;
    department: string;
    raisedBy: string;
    addField3: string;
    addField4: string;
    addField5: string;
    isActive: number;
    isDeleted: number;
    ticketOwner: string;
    projectId: number;
    companyId: number;
    companyName: string;
    companyCode: string;
    projectName: string;
    actionUser: number;
    createdOn: Date;
    modifiedOn: Date;
    assignedToName: string;
    ownedBy: string;
    ticketComments: string;
    createdBy: string;
    modifiedBy: string;
    name: string;
    assignedToId: number;
    userId: number;
    createdByName: string;
    startDate: Date;
    endDate: Date;
}
export interface ClientWorkListDTO {
    workInProgress: SupportTicketDTO[];
    assignedToMe: SupportTicketDTO[];
    openTickets: SupportTicketDTO[];
    closedTickets: SupportTicketDTO[];
    assignedToOthers: SupportTicketDTO[];
}

export interface TicketList {
    tickets: SupportTicketDTO[];
}


export interface GetClientListDTO {
    actionUser: number;
    companyId: number;
    startDate: Date;
    endDate: Date;
}

// TicketActivityDTO.ts
export interface TicketActivityDTO {
    ticketActivityId: number;
    ticketId: number;
    ticketComments: string;
    isDeleted: number;
    createdBy: string;
    createdOn?: Date;
    modifiedOn?: Date;
    modifiedBy: string;
}

// TicketActivityList.ts
export interface TicketActivityList {
    ticketActivities: TicketActivityDTO[];
}

// TicketAsigneeDTO.ts
export interface TicketAsigneeDTO {
    taId: number;
    ticketId: number;
    assignedTo: string;
    workRatio: number;
    assignDesc: string;
    aStatus: string;
    actionUser: string;
    assignedToName: string;
    assignedByName: string;
}

// TicketAsigneeList.ts
export interface TicketAsigneeList {
    ticketAsignee: TicketAsigneeDTO[];
}

export interface UserList {
    dropDownList: TicketUserDTO[];
}

export interface TicketUserDTO {
    key: string;
    value: string;
}

export interface TicketCommentDTO {
    createdBy?: string,
    ticketComments?: string,
    ticketId?: number
}
