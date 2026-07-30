using Application.DTOs.Common;
using Application.Interfaces.Common;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Common.Commands
{
    public class CreateAttachmentCommand : IRequest<AttachmentDTO>
    {
        public AttachmentDTO attachmentDTO { get; set; }
    }

    internal class CreateAttachmentCommandHandler : IRequestHandler<CreateAttachmentCommand, AttachmentDTO>
    {
        private readonly IAttachment _attachment;

        public CreateAttachmentCommandHandler(IAttachment attachment)
        {
            _attachment = attachment;
        }

        public async Task<AttachmentDTO> Handle(CreateAttachmentCommand request, CancellationToken cancellationToken)
        {
            return await _attachment.CreateAttachment(request.attachmentDTO);
        }
    }

    public class UpdateAttachmentCommand : IRequest<AttachmentDTO>
    {
        public UpdateAttachmentDTO updateAttachmentDTO { get; set; }
    }

    internal class UpdateAttachmentCommandHandler : IRequestHandler<UpdateAttachmentCommand, AttachmentDTO>
    {
        private readonly IAttachment _attachment;

        public UpdateAttachmentCommandHandler(IAttachment attachment)
        {
            _attachment = attachment;
        }

        public async Task<AttachmentDTO> Handle(UpdateAttachmentCommand request, CancellationToken cancellationToken)
        {
            return await _attachment.UpdateAttachment(request.updateAttachmentDTO);
        }
    }

    public class DeleteAttachmentCommand : IRequest<Unit>
    {
        public DeleteAttachmentDTO deleteAttachmentDTO { get; set; }
    }

    internal class DeleteAttachmentCommandHandler : IRequestHandler<DeleteAttachmentCommand, Unit>
    {
        private readonly IAttachment _attachment;

        public DeleteAttachmentCommandHandler(IAttachment attachment)
        {
            _attachment = attachment;
        }

        public async Task<Unit> Handle(DeleteAttachmentCommand request, CancellationToken cancellationToken)
        {
            await _attachment.DeleteAttachment(request.deleteAttachmentDTO);
            return Unit.Value;
        }
    }

    public class GetAttachmentsByMasterIdCommand : IRequest<AttachmentList>
    {
        public long MasterId { get; set; }
        public string MasterType { get; set; }
    }

    internal class GetAttachmentsByMasterIdCommandHandler : IRequestHandler<GetAttachmentsByMasterIdCommand, AttachmentList>
    {
        private readonly IAttachment _attachment;

        public GetAttachmentsByMasterIdCommandHandler(IAttachment attachment)
        {
            _attachment = attachment;
        }

        public async Task<AttachmentList> Handle(GetAttachmentsByMasterIdCommand request, CancellationToken cancellationToken)
        {
            return await _attachment.GetAttachmentsByMasterId(request.MasterId, request.MasterType);
        }
    }

    public class GetAttachmentByGUIDCommand : IRequest<AttachmentDTO>
    {
        public string GUID { get; set; }
    }

    internal class GetAttachmentByGUIDCommandHandler : IRequestHandler<GetAttachmentByGUIDCommand, AttachmentDTO>
    {
        private readonly IAttachment _attachment;

        public GetAttachmentByGUIDCommandHandler(IAttachment attachment)
        {
            _attachment = attachment;
        }

        public async Task<AttachmentDTO> Handle(GetAttachmentByGUIDCommand request, CancellationToken cancellationToken)
        {
            return await _attachment.GetAttachmentByGUID(request.GUID);
        }
    }

    public class GetAllowedExtensionsCommand : IRequest<AllowedExtensionList>
    {
    }

    internal class GetAllowedExtensionsCommandHandler : IRequestHandler<GetAllowedExtensionsCommand, AllowedExtensionList>
    {
        private readonly IAttachment _attachment;

        public GetAllowedExtensionsCommandHandler(IAttachment attachment)
        {
            _attachment = attachment;
        }

        public async Task<AllowedExtensionList> Handle(GetAllowedExtensionsCommand request, CancellationToken cancellationToken)
        {
            return await _attachment.GetAllowedExtensions();
        }
    }
}
