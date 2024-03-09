using Application.DTOs.LeadGeneration;
using Application.Features.LeadActivity.Commands;
using Application.Features.LeadGeneration.Commands;
using Application.Interfaces;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace WebAPI.Controllers.LeadGeneration
{
    [Route("LeadActivity")]
    public class LeadActivityController : BaseApiController
    {
        APISettings _settings;
        public LeadActivityController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost("CreateActivity")]
        public async Task<IActionResult> CreateActivity([FromBody] CreateActivityDTO createActivityDTO)
        {
            var response = await mediator.Send(new CreateLeadActivityCommand { createActivityDTO = createActivityDTO });

            if (response == null)
                return NotFound($"Failed to create sales Activity.");

            return Ok(response);
        }

        [HttpPost("UpdateActivity")]
        public async Task<IActionResult> UpdateActivity([FromBody] UpdateActivityDTO updateActivityDTO)
        {
            var response = await mediator.Send(new UpdateLeadActivityCommand { updateActivityDTO = updateActivityDTO });

            if (response == null)
                return NotFound($"Failed to update sales Activity.");

            return Ok(response);
        }

        [HttpPost("DeleteActivity")]
        public async Task<IActionResult> DeleteActivity([FromBody] DeleteActivityDTO deleteActivityDTO)
        {
            var response = await mediator.Send(new DeleteLeadActivityCommand { deleteActivityDTO = deleteActivityDTO });

            if (response == null)
                return NotFound($"Failed to delete sales Activity.");

            return Ok(response);
        }

        [HttpGet("GetAllActivityByLeadId/{LeadId}")]
        public async Task<IActionResult> GetAllActivityByLeadId(int LeadId)
        {
            var response = await mediator.Send(new GetAllLeadActivityCommand {  LeadId = LeadId });

            if (response == null)
                return NotFound($"Failed to delete sales Activity.");

            return Ok(response);
        }
    }
}
