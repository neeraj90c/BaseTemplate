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
using Application.Features.SupportDesk;

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

        [HttpPost("ReadAll")]
        public async Task<IActionResult> ReadAll([FromBody] GetAllSalesLeadByUserIdDTO getAllSalesLeadByUserIdDTO)
        {
            var response = await mediator.Send(new ReadAllCommand { getAllSalesLeadByUserIdDTO = getAllSalesLeadByUserIdDTO });
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

        [HttpGet("GetAssigneeListByLeadId/{LeadId}")]
        public async Task<IActionResult> GetAssigneeListByLeadId(int LeadId)
        {
            var response = await mediator.Send(new ReadAssigneeByLeadIdCommand { LeadId = LeadId });
            if (response == null)
                return NotFound($"Failed to find sales lead.");

            return Ok(response);
        }

        [HttpGet("ReadAllProjectList")]
        public async Task<IActionResult> ReadAllProjectList()
        {
            var response = await mediator.Send(new GetAllProjectListCommand());
            if (response == null)
                return NotFound($"Failed to find Projects.");

            return Ok(response);
        }


        [HttpGet("GetLeadResolverList")]
        public async Task<IActionResult> GetLeadResolverList()
        {
            var response = await mediator.Send(new GetLeadResolverCommand());
            if (response == null)
                return NotFound($"Failed to find Projects.");

            return Ok(response);
        }


        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] LeadAsigneeDTO leadAsigneeDTO)
        {
            LeadAsigneeList response = new LeadAsigneeList();


            response = await mediator.Send(new LeadAssignee_UpdateStatusCommand
            {
                leadAsigneeDTO = leadAsigneeDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("GetLeadWorklist")]
        public async Task<IActionResult> GetLeadWorklist([FromBody] GetWorkListDTO getWorkListDTO)
        {
            LeadWorkList response = new LeadWorkList();


            response = await mediator.Send(new GetSalesLeadWorkListCommand
            {
                getWorkListDTO = getWorkListDTO
         
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("SalesLeads_AssignToUser")]
        public async Task<IActionResult> SalesLeads_AssignToUser([FromBody] AssignLeadDTO assignLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();


            response = await mediator.Send(new SalesLeads_AssignToUserCommand
            {
                assignLeadDTO = assignLeadDTO

            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("SalesLead_Forceclose")]
        public async Task<IActionResult> SalesLead_Forceclose([FromBody] AssignLeadDTO assignLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();


            response = await mediator.Send(new SalesLead_ForcecloseCommand
            {
                assignLeadDTO = assignLeadDTO

            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }
        [HttpPost("LeadContactInsert")]
        public async Task<IActionResult> LeadContactInsert([FromBody] LeadContactDetailDTO leadContactDetailDTO)
        {
            LeadContactDetailList response = new LeadContactDetailList();


            response = await mediator.Send(new LeadContactInsertCommand
            {
                leadContactDetailDTO = leadContactDetailDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("LeadContactReadByLeadId")]
        public async Task<IActionResult> LeadContactReadByLeadId([FromBody] LeadContactDetailDTO leadContactDetailDTO)
        {
            LeadContactDetailList response = new LeadContactDetailList();


            response = await mediator.Send(new LeadContactReadByLeadIdCommand
            {
                leadContactDetailDTO = leadContactDetailDTO
            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }

        [HttpPost("SalesLead_Reopen")]
        public async Task<IActionResult> SalesLead_Reopen([FromBody] AssignLeadDTO assignLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();


            response = await mediator.Send(new SalesLead_ReopenCommand
            {
                assignLeadDTO = assignLeadDTO

            });

            if (response == null)
                return Ok(APIResponse<string>.Unauthorized("Please check login credentials"));

            return Ok(response);
        }




    }
}
