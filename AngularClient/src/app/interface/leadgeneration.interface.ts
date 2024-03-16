// salesLeadDTO
export interface SalesLeadDTO {
  leadId: number;
  projectId: number;
  pName?: string;
  companyId: number;
  cName?: string;
  lTitle: string;
  lDesc: string;
  category: string;
  tagList: string;
  assignedToName?: string;
  leadOwner: string;
  leadStatus: string;
  leadPriority: string;
  leadDate: Date;
  nextFollowUpDate: Date;
  addField1: string;
  addField2: string;
  addField3: string;
  isActive: number;
  isDeleted: number;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  actionUser: number;
  createdByName?: string
  CompanyCode?: string
}

// leadActivityDTO
export interface LeadActivityDTO {
  leadActivityId: number;
  leadId: number;
  leadComments: string;
  isActive: number;
  isDeleted: number;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  actionUser: number;
}

// leadAsigneeDTO
export interface LeadAsigneeDTO {
  lAId: number;
  leadId: number;
  assignedTo: string;
  aDesc: string;
  aStatus: string;
  isActive: number;
  isDeleted: number;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  actionUser: number;
}

// assignLeadDTO
export interface AssignLeadDTO {
  lAId?: number;
  leadId: number;
  assignedTo: string;
  aDesc: string;
  aStatus: string;
  actionUser: number;
}

// salesLeadList, leadActivityList, leadAsigneeList
export interface SalesLeadList {
  newAndOpen: SalesLeadDTO[];
  inProgress: SalesLeadDTO[];
  closed: SalesLeadDTO[];
  success: SalesLeadDTO[];
}

export interface LeadActivityList {
  items: LeadActivityDTO[];
}

export interface LeadAsigneeList {
  items: LeadAsigneeDTO[];
}

// createActivityDTO
export interface CreateActivityDTO {
  leadId: number;
  leadComments: string;
  actionUser: number;
}

// updateActivityDTO
export interface UpdateActivityDTO {
  leadActivityId: number;
  leadId: number;
  leadComments: string;
  actionUser: number;
}

// deleteActivityDTO
export interface DeleteActivityDTO {
  leadActivityId: number;
  actionUser: number;
}

// projectListDTO
export interface ProjectListDTO {
  projectId: number;
  pName: string;
  pCode: string;
  pDesc: string;
  isActive: number;
  isDeleted: number;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
}

// projectList
export interface ProjectList {
  items: ProjectListDTO[];
}

export interface LeadResolverDTO {
  name: string;
  userId: number
}

export interface LeadResolverList {
  items: LeadResolverDTO[]
}

export interface LeadWorkList {
  workInProgress: SalesLeadDTO[];
  assignedToMe: SalesLeadDTO[];
  openLeads: SalesLeadDTO[];
  closedLeads: SalesLeadDTO[];
  assignedToOthers: SalesLeadDTO[];
  success: SalesLeadDTO[];
}

export interface GetWorkListDTO {
  actionUser: number;
  companyId: number;
  startDate: Date;
  endDate: Date;
}

