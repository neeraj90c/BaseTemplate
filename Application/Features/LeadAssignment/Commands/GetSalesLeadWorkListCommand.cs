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
    public class GetSalesLeadWorkListCommand : IRequest<LeadWorkList>
    {
        public GetWorkListDTO getWorkListDTO {  get; set; }
    }

    internal class GetSalesLeadWorkListCommandHandler : IRequestHandler<GetSalesLeadWorkListCommand, LeadWorkList>
    {
        protected readonly ISalesLead _salesLead;

        public GetSalesLeadWorkListCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<LeadWorkList> Handle(GetSalesLeadWorkListCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.GetSalesLeadWorkList(request.getWorkListDTO);
        }
    }
}
