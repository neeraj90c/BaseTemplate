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
    public class LeadAssignee_UpdateStatusCommand : IRequest<LeadAsigneeList>
    {
        public  LeadAsigneeDTO leadAsigneeDTO {get;set;}
    }
    internal class LeadAssignee_UpdateStatusCommandHandler : IRequestHandler<LeadAssignee_UpdateStatusCommand, LeadAsigneeList>
    {
        private readonly ISalesLead _salesLead;
        public LeadAssignee_UpdateStatusCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<LeadAsigneeList> Handle(LeadAssignee_UpdateStatusCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.LeadAsignee_UpdateStatus( request.leadAsigneeDTO);
        }
    }
}
