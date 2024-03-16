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
    public class UpdateLeadActivityCommand : IRequest<LeadActivityList>
    {
        public UpdateActivityDTO updateActivityDTO {  get; set; }
    }

    internal class UpdateLeadActivityCommandHandler : IRequestHandler<UpdateLeadActivityCommand, LeadActivityList>
    {
        protected readonly ILeadActivity _leadActivity;

        public UpdateLeadActivityCommandHandler(ILeadActivity leadActivity)
        {
            _leadActivity = leadActivity;
        }
        public async Task<LeadActivityList> Handle(UpdateLeadActivityCommand request, CancellationToken cancellationToken)
        {
            return await _leadActivity.UpdateLeadActivity(request.updateActivityDTO);
        }
    }
}
