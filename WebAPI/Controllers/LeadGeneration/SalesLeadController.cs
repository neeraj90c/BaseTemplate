using Application.DTOs.LeadGeneration;
using Application;
using Application.DTOs.SupportDesk;
using Application.Features.LeadGeneration.Commands;
using Application.Interfaces;
using Domain.Settings;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System;

namespace WebAPI.Controllers.LeadGeneration
{
    [Route("SalesLead")]
    public class SalesLeadController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SalesLeadController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("CreateLead")]
        public async Task<IActionResult> CreateLead([FromBody] SalesLeadDTO salesLeadDTO)
        {
            var response = await _mediator.Send(new CreateSalesLeadCommand { salesLeadDTO = salesLeadDTO });

            if (response == null)
                return NotFound($"Failed to create sales lead.");

            return Ok(response);
        }

        [HttpDelete("DeleteLead/{leadId}/{actionUser}")]
        public async Task<IActionResult> DeleteLead(long leadId, int actionUser)
        {
            await _mediator.Send(new DeleteSalesLeadCommand { LeadId = leadId, ActionUser = actionUser });
            return NoContent();
        }

        [HttpPost("UpdateLead")]
        public async Task<IActionResult> UpdateLead([FromBody] SalesLeadDTO salesLeadDTO)
        {
            var response = await _mediator.Send(new UpdateSalesLeadCommand { salesLeadDTO = salesLeadDTO });

            if (response == null)
                return NotFound($"Failed to create sales lead.");

            return Ok(response);
        }


    }
}
