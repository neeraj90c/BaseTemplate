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
using Application.Features.LeadAssignment.Commands;

namespace WebAPI.Controllers.LeadGeneration
{
    [Route("SalesLead")]
    public class SalesLeadController : BaseApiController
    {
        APISettings _settings;
        protected readonly IEncryptDecrypt _encryptDecrypt;

        public SalesLeadController(IOptions<APISettings> settings, IEncryptDecrypt encryptDecrypt)
        {
            _settings = settings.Value;
            _encryptDecrypt = encryptDecrypt;
        }

        [HttpPost("CreateLead")]
        public async Task<IActionResult> CreateLead([FromBody] SalesLeadDTO salesLeadDTO)
        {
            var response = await mediator.Send(new CreateSalesLeadCommand { salesLeadDTO = salesLeadDTO });

            if (response == null)
                return NotFound($"Failed to create sales lead.");

            return Ok(response);
        }

        [HttpDelete("DeleteLead/{leadId}/{actionUser}")]
        public async Task<IActionResult> DeleteLead(long leadId, int actionUser)
        {
            await mediator.Send(new DeleteSalesLeadCommand { LeadId = leadId, ActionUser = actionUser });
            return NoContent();
        }

        [HttpPost("UpdateLead")]
        public async Task<IActionResult> UpdateLead([FromBody] SalesLeadDTO salesLeadDTO)
        {
            var response = await mediator.Send(new UpdateSalesLeadCommand { salesLeadDTO = salesLeadDTO });

            if (response == null)
                return NotFound($"Failed to update sales lead.");

            return Ok(response);
        }

        [HttpGet("ReadLeadByLeadId/{LeadId}")]
        public async Task<IActionResult> ReadByLeadId(long LeadId)
        {
            var response = await mediator.Send(new ReadLeadByIdCommand { LeadId = LeadId });
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }

        [HttpGet("ReadAll")]
        public async Task<IActionResult> ReadAll()
        {
            var response = await mediator.Send(new ReadAllCommand());
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }


        [HttpPost("AssignLead")]
        public async Task<IActionResult> AssignLead([FromBody] AssignLeadDTO assignLeadDTO)
        {
            var response = await mediator.Send(new AssignLeadCommand { assignLeadDTO = assignLeadDTO });
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }
        [HttpPost("UpdateLeadAssignee")]
        public async Task<IActionResult> UpdateLeadAssignee([FromBody] AssignLeadDTO assignLeadDTO)
        {
            var response = await mediator.Send(new UpdateLeadAssigneeCommand { assignLeadDTO = assignLeadDTO });
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }
        [HttpPost("DeleteLeadAssignee")]
        public async Task<IActionResult> DeleteLeadAssignee([FromBody] AssignLeadDTO assignLeadDTO)
        {
            var response = await mediator.Send(new DeleteLeadAssigneeCommand { assignLeadDTO = assignLeadDTO });
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }

        [HttpPost("GetAssigneeListByLeadId")]
        public async Task<IActionResult> GetAssigneeListByLeadId([FromBody] AssignLeadDTO assignLeadDTO)
        {
            var response = await mediator.Send(new ReadAssigneeByLeadIdCommand { assignLeadDTO = assignLeadDTO });
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }


    }
}
