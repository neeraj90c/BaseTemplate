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
    public class LeadContactUpdateCommand : IRequest<LeadContactDetailList>
    {
        public LeadContactDetailDTO leadContactDetailDTO { get; set; }
    }

    internal class LeadContactUpdateCommandHandler : IRequestHandler<LeadContactUpdateCommand, LeadContactDetailList>
    {
        private readonly ISalesLead _salesLead;

        public LeadContactUpdateCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<LeadContactDetailList> Handle(LeadContactUpdateCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.LeadContactUpdate(request.leadContactDetailDTO);
        }
    }
}
