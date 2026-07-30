using System;
using System.Collections.Generic;

namespace Application.DTOs.Common
{
    public class AttachmentDTO
    {
        public long AttachmentId { get; set; }
        public long MasterId { get; set; }
        public string MasterType { get; set; }
        public string FileName { get; set; }
        public string GUID { get; set; }
        public string FileType { get; set; }
        public string Extension { get; set; }
        public long FileSizeBytes { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
        public string URL { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ActionUser { get; set; }
    }

    public class AttachmentList
    {
        public IEnumerable<AttachmentDTO> Items { get; set; }
    }

    // Input for the upload endpoint. The file itself is bound separately via
    // [FromForm] IFormFile in the controller - it never crosses into Application.
    public class UploadAttachmentDTO
    {
        public long MasterId { get; set; }
        public string MasterType { get; set; }
        public string Description { get; set; }
        public string ActionUser { get; set; }
    }

    public class UpdateAttachmentDTO
    {
        public long AttachmentId { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        public string ActionUser { get; set; }
    }

    public class DeleteAttachmentDTO
    {
        public long AttachmentId { get; set; }
        public string ActionUser { get; set; }
    }

    public class AllowedExtensionDTO
    {
        public int ExtensionId { get; set; }
        public string Extension { get; set; }
        public string FileType { get; set; }
        public long MaxSizeBytes { get; set; }
        public int IsActive { get; set; }
    }

    public class AllowedExtensionList
    {
        public IEnumerable<AllowedExtensionDTO> Items { get; set; }
    }
}
