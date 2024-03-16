using Application.DTOs.LeadGeneration;
using Application.Interfaces.LeadActivity;
using Application.Interfaces.LeadGeneration;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.LeadActivity.Commands
{
    public class CreateLeadActivityCommand : IRequest<LeadActivityList>
    {
        public CreateActivityDTO createActivityDTO { get; set; }
    }

    internal class CreateLeadActivityCommandHandler : IRequestHandler<CreateLeadActivityCommand, LeadActivityList>
    {
        protected readonly ILeadActivity _leadActivity;

        public CreateLeadActivityCommandHandler(ILeadActivity leadActivity)
        {
            _leadActivity = leadActivity;
        }
        public async Task<LeadActivityList> Handle(CreateLeadActivityCommand request, CancellationToken cancellationToken)
        {
            return await _leadActivity.CreateLeadActivity(request.createActivityDTO);
        }
    }
}
