export interface CompanyMasterDTO {
    companyId: number;
    cName: string;
    cCode: string;
    cDesc: string;
    cAddress: string;
    email: string;
    phone: string;
    website: string;
    category: string;
    subCategory: string;
    contactPerson: string;
    createdOn: Date;
    modifiedBy: string;
    createdBy: string;
    modifiedOn: Date;
    isActive: number;
    isDeleted: number;
    cType: string;
    actionUser: string;
  }

  export interface CompanyList{
    companies:CompanyMasterDTO[]
  }
  