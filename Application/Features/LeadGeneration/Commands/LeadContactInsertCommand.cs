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
    public class LeadContactInsertCommand : IRequest<LeadContactDetailList>
    {
        public LeadContactDetailDTO leadContactDetailDTO { get; set; }
    }

    internal class LeadContactInsertCommandHandler : IRequestHandler<LeadContactInsertCommand, LeadContactDetailList>
    {
        private readonly ISalesLead _salesLead;

        public LeadContactInsertCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<LeadContactDetailList> Handle(LeadContactInsertCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.LeadContactInsert(request.leadContactDetailDTO);
        }
    }





}
