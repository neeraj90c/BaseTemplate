export interface MenuRole {
    menuId: number;
    menuName: string;
    menuCode: string;
    menuDesc: string;
    parentMenuId: number;
    sRoleId: number;
    displayOrder: number;
    menuRoleId: number;
    hasAccess: boolean;
    actionUser: number;
    isActive: number;
    isDeleted: number;
    }
    
    export interface MenuRoleDTO{
      menuRoles : MenuRole[]
    }
  