using Application.DTOs.LeadGeneration;
using Application.Interfaces.LeadGeneration;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.LeadAssignment.Commands
{
    public class SalesLead_ReopenCommand : IRequest<SalesLeadDTO>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }
    }

    internal class SalesLead_ReopenCommandHandler : IRequestHandler<SalesLead_ReopenCommand, SalesLeadDTO>
    {
        protected readonly ISalesLead _salesLead;

        public SalesLead_ReopenCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<SalesLeadDTO> Handle(SalesLead_ReopenCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.SalesLead_ReOpen(request.assignLeadDTO);
        }
    }
}
