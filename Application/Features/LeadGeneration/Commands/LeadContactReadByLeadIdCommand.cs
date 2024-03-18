using Application.DTOs.LeadGeneration;
using Application.Interfaces.LeadGeneration;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.LeadGeneration.Commands
{
    public class LeadContactReadByLeadIdCommand : IRequest<LeadContactDetailList>
    {
        public LeadContactDetailDTO leadContactDetailDTO { get; set; }
    }

    internal class LeadContactReadByLeadIdCommandHandler : IRequestHandler<LeadContactReadByLeadIdCommand, LeadContactDetailList>
    {
        protected readonly ISalesLead _salesLead;

        public LeadContactReadByLeadIdCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<LeadContactDetailList> Handle(LeadContactReadByLeadIdCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.LeadContactReadByLeadId(request.leadContactDetailDTO);
        }
    }
}
