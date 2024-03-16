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
    public class SalesLeads_AssignToUserCommand : IRequest<SalesLeadDTO>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }
    }

    internal class SalesLeads_AssignToUserCommandHandler : IRequestHandler<SalesLeads_AssignToUserCommand, SalesLeadDTO>
    {
        protected readonly ISalesLead _salesLead;

        public SalesLeads_AssignToUserCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<SalesLeadDTO> Handle(SalesLeads_AssignToUserCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.SalesLeads_AssignToUser(request.assignLeadDTO);
        }
    }
}
