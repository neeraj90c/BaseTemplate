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

    public class ReadAllCommand : IRequest<SalesLeadList>
    {
        public GetAllSalesLeadByUserIdDTO getAllSalesLeadByUserIdDTO {  get; set; }
    }
    internal class ReadAllCommandHandler : IRequestHandler<ReadAllCommand, SalesLeadList>
    {
        private readonly ISalesLead _salesLead;

        public ReadAllCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<SalesLeadList> Handle(ReadAllCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.GetAllSalesLead(request.getAllSalesLeadByUserIdDTO);
        }

    }
}
