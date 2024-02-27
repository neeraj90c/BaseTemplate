export interface SubRole {
    menuId: number;
    menuName: string;
    menuCode: string;
    menuDesc: string;
    parentMenuId: number;
    roleId: number;
    displayOrder: number;
    subRoleId: number;
    hasAccess: boolean;
    actionUser: number;
    isActive: number;
    isDeleted: number;
    }
    
    export interface SubRolesDTO{
      subRoles : SubRole[]
    }
  