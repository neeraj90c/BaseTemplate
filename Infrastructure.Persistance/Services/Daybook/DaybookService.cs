using Application.Interfaces.Daybook;
using Domain.Settings;
using Infrastructure.Persistance.Services.LeadGeneration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.Services.Daybook
{
    public class DaybookService : DABase, IDaybook
    {
        APISettings _settings;
        private ILogger<LeadActivityService> _logger;
        private const string SP_GetDaybook_ByUserId = "lg.GetDaybook_ByUserId";

        public DaybookService(IOptions<ConnectionSettings> connectionSettings, ILogger<LeadActivityService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }
    }
}
