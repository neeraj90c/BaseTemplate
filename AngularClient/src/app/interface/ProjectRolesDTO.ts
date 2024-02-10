export interface ProjectRoles {
    projectRoleId: number;
    roleName: string;
    roleDesc: string;
    isActive: number;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    isDeleted: number;
    actionUser: number;
}

export interface ProjectRolesDTO {
    projectRoles: ProjectRoles[];
}