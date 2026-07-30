using Application.DTOs.Common;
using System.Threading.Tasks;

namespace Application.Interfaces.Common
{
    public interface IAttachment
    {
        Task<AttachmentDTO> CreateAttachment(AttachmentDTO attachmentDTO);
        Task<AttachmentDTO> UpdateAttachment(UpdateAttachmentDTO updateAttachmentDTO);
        Task DeleteAttachment(DeleteAttachmentDTO deleteAttachmentDTO);
        Task<AttachmentList> GetAttachmentsByMasterId(long masterId, string masterType);
        Task<AttachmentDTO> GetAttachmentByGUID(string guid);
        Task<AllowedExtensionList> GetAllowedExtensions();
    }
}
