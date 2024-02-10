export interface UserGroup {
    pageNo: number;
    pageSize: number;
    rowNum: number,
    totalCount: number,
    groupId: number;
    groupName: string|null;
    groupCode: string | null;
    groupDesc: string| null;
    isActive: number;
    createdBy: string ;
    createdOn: Date;
    modifiedBy: string | null;
    modifiedOn: Date|null;
    isDeleted: number;
    actionUser: number;

}
export interface userGroupDTO {
    groups : UserGroup[]
}
