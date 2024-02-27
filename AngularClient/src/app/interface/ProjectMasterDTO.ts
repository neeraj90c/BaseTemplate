export interface ProjectData {
    projects: ProjectMasterDTO[];
}

export interface ProjectMasterDTO {
    projectId: number | null,
    projectName: string,
    projectDescription: string,
    projectStartDate: Date,
    projectEndDate: Date,
    templateId: number,
    statusId: number,
    isActive: number ,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
    actionUser: number,
    tagId: string,
    activeProjectId: number,
    shortDesc : string,
    tags: string

}

export interface TagDTO {
    tagId: number,
    tagName: string,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
    actionUser: number,
  }
export interface TagList {
    tags: TagDTO[];
}

export interface ProjectTagsDTO {
    projectId: number;
    tagId: number;
    isActive: number;
    isDeleted: number;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    actionUser: number;
  }
  
  export interface ProjectTagsMap {
    projectTags : ProjectTagsDTO[];
  }
