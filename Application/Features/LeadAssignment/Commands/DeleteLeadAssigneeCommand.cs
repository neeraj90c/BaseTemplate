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
    public class DeleteLeadAssigneeCommand : IRequest<LeadAsigneeList>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }
    }


    internal class DeleteLeadAssigneeCommandHandler : IRequestHandler<DeleteLeadAssigneeCommand, LeadAsigneeList>
    {
        protected readonly ISalesLead _salesLead;

        public DeleteLeadAssigneeCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<LeadAsigneeList> Handle(DeleteLeadAssigneeCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.DeleteLeadAssignee(request.assignLeadDTO);
        }
    }
}
