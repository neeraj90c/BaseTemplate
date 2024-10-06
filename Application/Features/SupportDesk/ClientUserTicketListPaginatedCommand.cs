using Application.DTOs.SupportDesk;
using Application.Interfaces.SupportDesk;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.SupportDesk
{


    public class ClientUserTicketListPaginatedCommand : IRequest<TicketList>
    {
        public GetTicketByUserIdDTO getTicketByUserIdDTO { get; set; }
    }

    internal class ClientUserTicketListPaginatedCommandHandler : IRequestHandler<ClientUserTicketListPaginatedCommand,TicketList>
    {
        protected readonly ISupportTicket _supportTicket;

        public ClientUserTicketListPaginatedCommandHandler(ISupportTicket supportTicket)
        {
            _supportTicket = supportTicket;
        }
        public async Task<TicketList> Handle(ClientUserTicketListPaginatedCommand request, CancellationToken cancellationToken)
        {
            return await _supportTicket.SupportTickets_GetByUserIdPaginated(request.getTicketByUserIdDTO);
        }
    }

}
