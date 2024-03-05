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
    public class DeleteSalesLeadCommand : IRequest
    {
        public long LeadId { get; set; }
        public int ActionUser { get; set; }

    }

    internal class DeleteSalesLeadCommandHandler : IRequestHandler<DeleteSalesLeadCommand>
    {
        private readonly ISalesLead _salesLead;

        public DeleteSalesLeadCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<Unit> Handle(DeleteSalesLeadCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _salesLead.DeleteSalesLead(request.LeadId, request.ActionUser);
                return Unit.Value;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }

}
