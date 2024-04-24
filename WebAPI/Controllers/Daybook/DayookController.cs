using Application.DTOs.LeadGeneration;
using Application.Features.Daybook.Commands;
using Application.Features.LeadActivity.Commands;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace WebAPI.Controllers.Daybook
{

    [Route("Daybook")]
    public class DayookController : BaseApiController
    {
        APISettings _settings;
        public DayookController(IOptions<APISettings> settings)
        {
            _settings = settings.Value;
        }



        [HttpPost("Daybook_ByUserId")]
        public async Task<IActionResult> Daybook_ByUserId(GetDaybook getDaybook)
        {
            var response = await mediator.Send(new GetDaybook_ByUserIdCommand { getDaybook = getDaybook });

            if (response == null)
                return NotFound($"Failed to delete sales Activity.");

            return Ok(response);
        }
    }
}
