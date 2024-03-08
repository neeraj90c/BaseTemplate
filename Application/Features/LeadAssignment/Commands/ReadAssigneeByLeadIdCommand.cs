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
    public class ReadAssigneeByLeadIdCommand : IRequest<LeadAsigneeList>
    {
        public AssignLeadDTO assignLeadDTO { get; set; }

    }



    internal class ReadAssigneeByLeadIdCommandHandler : IRequestHandler<ReadAssigneeByLeadIdCommand, LeadAsigneeList>
    {
        protected readonly ISalesLead _salesLead;

        public ReadAssigneeByLeadIdCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<LeadAsigneeList> Handle(ReadAssigneeByLeadIdCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.GetAssingeeListByLeadId(request.assignLeadDTO);
        }
    }
}
