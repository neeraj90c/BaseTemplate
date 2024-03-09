using Application.DTOs.LeadGeneration;
using Application.Interfaces.LeadActivity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.LeadActivity.Commands
{
    public class DeleteLeadActivityCommand : IRequest<LeadActivityList>
    {
        public DeleteActivityDTO deleteActivityDTO { get; set; }
    }


    internal class DeleteLeadActivityCommandHandler : IRequestHandler<DeleteLeadActivityCommand, LeadActivityList>
    {
        protected readonly ILeadActivity _leadActivity;

        public DeleteLeadActivityCommandHandler(ILeadActivity leadActivity)
        {
            _leadActivity = leadActivity;
        }
        public async Task<LeadActivityList> Handle(DeleteLeadActivityCommand request, CancellationToken cancellationToken)
        {
            return await _leadActivity.DeleteLeadActivity(request.deleteActivityDTO);
        }
    }
}
