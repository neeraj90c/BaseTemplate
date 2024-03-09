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
    public class GetAllLeadActivityCommand : IRequest<LeadActivityList>
    {
        public int LeadId {  get; set; }
    }

    internal class GetAllLeadActivityCommandHandler : IRequestHandler<GetAllLeadActivityCommand, LeadActivityList>
    {
        private readonly ILeadActivity _leadActivity;
        public GetAllLeadActivityCommandHandler(ILeadActivity leadActivity)
        {
            _leadActivity = leadActivity;
        }
        public async Task<LeadActivityList> Handle(GetAllLeadActivityCommand request, CancellationToken cancellationToken)
        {
            return await _leadActivity.GetAllLeadActivity(request.LeadId);
        }
    }
}
