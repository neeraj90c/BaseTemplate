export interface UserData {
  users: UserMasterDTO[];
}

export interface UserMasterDTO {
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  emailId: string;
  mobileNo: string;
  designation: string;
  isActive: number;
  isDeleted: number;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  actionUser: number;
  profileImage: string;
  activeUserId: number;
  webRootPath: string;
  profileImageBase64: string;
  username: string;
  assignedWC: string;
  companyId: number;
  companyName: string;
  roleName: string;
}

export interface UserCredentials {
  userId: number,
  userName: string,
  userPassword: string,
  actionUser: number,
}


export interface FilteredUserList {
  Name: string,
  Designation: string | null,
  Phone: string | null,
  Email: string | null,
  Username: string | null,
  CreatedBy: string | null,
  AssignedWorkcenter: string | null,
  Active: number | null,
  rowData: UserMasterDTO
}


