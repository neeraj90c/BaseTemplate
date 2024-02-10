export interface TemplateDTO {
    templateId: number;
    templateName: string;
    templateDesc: string;
    isActive: number;
    isDeleted: number;
    actionUser: number;
    createdBy: string;
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
}

export interface TemplateList {
    templates: TemplateDTO[];
}

export interface TemplateDetailDTO {
    templateWorkItemId: number;
    templateId: number;
    workItemName: string;
    parentWorkItemId: number;
    displayOrder: number;
    isTask: number;
    projectRoleId: number;
    isActive: number;
    isDeleted: number;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    estimatedHours: number;
    actionUser: number;
    totalHours: number;
    roleName: string;
    children: TemplateDetailDTO[];
}

export interface TemplateDetail {
    templateData: TemplateDetailDTO[];
}

