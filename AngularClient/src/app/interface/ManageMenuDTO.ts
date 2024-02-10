export interface ParentMenu {
    userId: number;
    roleId: number;
    menuId: number;
    parentMenuId: number;
    subRoleId: number;
    subRoleName: string;
    subRoleCode: string;
    subRoleDesc: string;
    displayOrder: number;
    defaultChildMenuId: number;
    menuIconUrl: string;
    templatePath: string;
    isParent: number;
    childrenCount: number;
    childIsParent: number;
    childMenuList?: ParentMenu[];

}

export interface MenuDataItem {
    items: ParentMenu[];
}


export interface MenuManage {
    menuId: number;
    menuName: string;
    menuCode: string;
    menuDesc: string;
    displayOrder: number;
    parentMenuId: number;
    defaultChildMenuId: number;
    menuIconUrl: string;
    templatePath: string;
    isActive: number;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    isDeleted: number;
    actionUser: number;
}

export interface MenuManageDTO {
    menus: MenuManage[];
}
