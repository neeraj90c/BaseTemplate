using Application.DTOs.SupportDesk;
using Application.Interfaces.LeadGeneration;
using Application.Interfaces.SupportDesk;
using MediatR;
using MediatR.Pipeline;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.SupportDesk
{
    public class GetAllProjectListCommand : IRequest<ProjectList>
    {

    }
    internal class GetAllProjectListCommandHandler : IRequestHandler<GetAllProjectListCommand, ProjectList>
    {
        protected readonly ISalesLead _salesLead;
        public GetAllProjectListCommandHandler(ISalesLead salesLead)
        {
            _salesLead = salesLead;
        }

        public async Task<ProjectList> Handle(GetAllProjectListCommand request, CancellationToken cancellationToken)
        {
            return await _salesLead.GetAllProjectList();
        }
    }
}
