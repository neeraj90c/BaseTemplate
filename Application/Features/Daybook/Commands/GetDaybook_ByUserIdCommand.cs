using Application.DTOs.LeadGeneration;
using Application.Interfaces.Daybook;
using Application.Interfaces.LeadActivity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Daybook.Commands
{
    public class GetDaybook_ByUserIdCommand : IRequest<DaybookLeadList>
    {
        public int ActionUser { get; set; }
    }

    internal class GetDaybook_ByUserIdCommandHandler : IRequestHandler<GetDaybook_ByUserIdCommand, DaybookLeadList>
    {
        protected readonly IDaybook _daybook;
        public GetDaybook_ByUserIdCommandHandler(IDaybook daybook)
        {
            _daybook = daybook;
        }

        public async Task<DaybookLeadList> Handle(GetDaybook_ByUserIdCommand request, CancellationToken cancellationToken)
        {
            return await _daybook.GetDaybook_ByUserId(request.ActionUser);
        }
    }

}
