export interface UserRole {
    pageNo: number;
    pageSize: number;
    rowNum: number;
    totalCount: number;
    roleId: number;
    roleName: string;
    roleCode: string;
    roleDesc: string;
    isActive: number;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    isDeleted: number;
    actionUser: number;
}

export interface UserRoleDTO {
    roles: UserRole[];
}