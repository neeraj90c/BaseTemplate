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
    public class SalesLead_ForcecloseCommand : IRequest<SalesLeadDTO>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }
    }

    internal class SalesLead_ForcecloseCommandHandler : IRequestHandler<SalesLead_ForcecloseCommand, SalesLeadDTO>
    {
        protected readonly ISalesLead _salesLead;

        public SalesLead_ForcecloseCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<SalesLeadDTO> Handle(SalesLead_ForcecloseCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.SalesLead_Forceclose(request.assignLeadDTO);
        }
    }
}
