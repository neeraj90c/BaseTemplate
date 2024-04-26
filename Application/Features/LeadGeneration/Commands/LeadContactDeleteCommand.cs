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
    public class LeadContactDeleteCommand : IRequest<string>
    {
        public DeleteLeadContact deleteLeadContact { get; set; }
    }

    internal class LeadContactDeleteCommandHandler : IRequestHandler<LeadContactDeleteCommand, string>
    {
        protected readonly ISalesLead _salesLead;
        public LeadContactDeleteCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<string> Handle(LeadContactDeleteCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.LeadContactDelete(request.deleteLeadContact);
        }
    }
}
