// Mirrors Application.DTOs.Common.AttachmentDTO / AttachmentList on the backend.
// ASP.NET Core's default System.Text.Json camelCases property names, so
// "GUID" comes back as "guid" and everything else follows normal camelCase.

export interface AttachmentDTO {
  attachmentId: number;
  masterId: number;
  masterType: string;
  fileName: string;
  guid: string;
  fileType: string;
  extension: string;
  fileSizeBytes: number;
  description: string;
  path: string;
  url: string;
  isActive: number;
  isDeleted: number;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date | null;
}

export interface AttachmentList {
  items: AttachmentDTO[];
}

export interface UpdateAttachmentDTO {
  attachmentId: number;
  fileName: string;
  description: string;
  actionUser: string;
}

export interface DeleteAttachmentDTO {
  attachmentId: number;
  actionUser: string;
}

export interface AllowedExtensionDTO {
  extensionId: number;
  extension: string;
  fileType: string;
  maxSizeBytes: number;
  isActive: number;
}

export interface AllowedExtensionList {
  items: AllowedExtensionDTO[];
}

// A file the user has picked but that hasn't (yet) been uploaded - used by
// AttachmentPickerComponent while staging files on create forms, and to track
// per-file upload/retry state once a save actually happens.
export interface StagedAttachment {
  file: File;
  description?: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'failed';
  errorMessage?: string;
  uploaded?: AttachmentDTO;
}
