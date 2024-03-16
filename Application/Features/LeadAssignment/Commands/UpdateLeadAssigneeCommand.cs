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
    public class UpdateLeadAssigneeCommand : IRequest<LeadAsigneeList>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }

    }


    internal class UpdateLeadAssigneeCommandHandler : IRequestHandler<UpdateLeadAssigneeCommand, LeadAsigneeList>
    {
        protected readonly ISalesLead _salesLead;

        public UpdateLeadAssigneeCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<LeadAsigneeList> Handle(UpdateLeadAssigneeCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.UpdateLeadAssignee(request.assignLeadDTO);
        }
    }
}
