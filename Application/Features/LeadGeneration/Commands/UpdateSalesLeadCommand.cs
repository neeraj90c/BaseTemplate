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
    public class UpdateSalesLeadCommand : IRequest<SalesLeadDTO>
    {
        public SalesLeadDTO salesLeadDTO { get; set; }
    }
    internal class UpdateSalesLeadCommandHandler : IRequestHandler<UpdateSalesLeadCommand, SalesLeadDTO>
    {
        protected readonly ISalesLead _salesLead;

        public UpdateSalesLeadCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<SalesLeadDTO> Handle(UpdateSalesLeadCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.UpdateSalesLead(request.salesLeadDTO);
        }
    }
}
