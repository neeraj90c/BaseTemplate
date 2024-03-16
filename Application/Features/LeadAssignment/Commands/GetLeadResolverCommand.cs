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
    public class GetLeadResolverCommand :IRequest<LeadResolverList>
    {

    }

    internal class GetLeadResolverCommandHandler:IRequestHandler<GetLeadResolverCommand, LeadResolverList>
    {
        protected readonly ISalesLead _salesLead;
        public GetLeadResolverCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<LeadResolverList> Handle(GetLeadResolverCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.GetLeadResolverList();
        }
    }
}
