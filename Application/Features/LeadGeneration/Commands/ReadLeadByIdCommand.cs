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
    public class ReadLeadByIdCommand :IRequest<SalesLeadDTO>
    {
        public long LeadId { get; set; }
    }
    internal class ReadLeadByIdCommandHandler : IRequestHandler<ReadLeadByIdCommand, SalesLeadDTO>
    {
        private readonly ISalesLead _salesLead;

        public ReadLeadByIdCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }
        public async Task<SalesLeadDTO>Handle(ReadLeadByIdCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.ReadSalesLeadByLeadId(request.LeadId);
        }
    }
}
