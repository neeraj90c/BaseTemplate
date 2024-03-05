using Application.DTOs.LeadGeneration;
using Application.DTOs.SupportDesk;
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
    public class CreateSalesLeadCommand : IRequest<SalesLeadDTO>
    {
        public SalesLeadDTO salesLeadDTO {  get; set; }
    }

    internal class CreateSalesLeadCommandHandler : IRequestHandler<CreateSalesLeadCommand, SalesLeadDTO>
    {
        protected readonly ISalesLead _salesLead;

        public CreateSalesLeadCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<SalesLeadDTO> Handle(CreateSalesLeadCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.CreateSalesLead( request.salesLeadDTO);
        }
    }
}
