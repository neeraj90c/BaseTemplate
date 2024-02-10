export interface User {
    token: string,
    userId: number,
    profileImage: string,
    userName: string,
    designation: string,
    emailId: string,
    mobileNo: string,
    roleId: string
}

  
  // child-menu.interface.ts
  



  export interface UserLoginDTO {
    userName: string;
    password: string;
    companyCode: string;
    firstName?: string;
    lastName?: string;
    azureUserId?: string;
    azureEmailId?: string;
    expiresOn: number;
  }

  export interface AuthToken {
    aud: string;
    iss: string;
    iat: number;
    nbf: number;
    exp: number;
    acct: number;
    acr: string;
    aio: string;
    altsecid: string;
    amr: string[];
    app_displayname: string;
    appid: string;
    appidacr: string;
    email: string;
    family_name: string;
    given_name: string;
    idp: string;
    idtyp: string;
    ipaddr: string;
    name: string;
    oid: string;
    platf: string;
    puid: string;
    rh: string;
    scp: string;
    signin_state: string[];
    sub: string;
    tenant_region_scope: string;
    tid: string;
    unique_name: string;
    uti: string;
    ver: string;
    wids: string[];
    xms_st: {
        sub: string;
    };
    xms_tcdt: number;
}
export interface UserResponseDTO {
  success: boolean;
    message: string;
    statusCode: number;
    data: {
        token: string;
        profileImage: string;
        userId: number;
        userNameIntial: string;
        designation: string;
        emailId: string;
        mobileNo: string;
        roleId: string;
    }
}


export interface TokenResponse {
  token: string;
  userId: number;
  profileImage: string;
  userName: string;
  designation: string;
  emailId: string;
  mobileNo: string;
  roleId: string;
}

export interface PaginatedUserRoleCRUD {
  pageNo: number;
  pageSize: number;
  rowNum: number;
  totalCount: number;
  roleName: string;
  userRoleId: number;
  userId: number;
  roleId: number;
  isActive: number;
  actionUser: number;
  isDeleted: number;
}






