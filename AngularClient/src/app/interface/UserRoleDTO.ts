export interface RolesDTO {
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

export interface RoleList {
  roles: RolesDTO[];
}

export interface UserRoleDTO {
  roleName: string;
  userRoleId: number;
  userId: number;
  roleId: number;
  isActive: number;
  actionUser: number;
  isDeleted: number;
}

export interface UserRoleList {
  userRole: UserRoleDTO[]
}