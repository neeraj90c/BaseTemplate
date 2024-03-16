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
    public class AssignLeadCommand : IRequest<LeadAsigneeList>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }
    }

    internal class AssignLeadCommandHandler : IRequestHandler<AssignLeadCommand, LeadAsigneeList>
    {
        protected readonly ISalesLead _salesLead;

        public AssignLeadCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<LeadAsigneeList> Handle(AssignLeadCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.AssignLead(request.assignLeadDTO);
        }
    }
}
