using Application.DTOs.LeadGeneration;
using Application.Interfaces.Daybook;
using Domain.Settings;
using Infrastructure.Persistance.Services.LeadGeneration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Reflection.PortableExecutable;

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



        public async Task<DaybookLeadList> GetDaybook_ByUserId(int ActionUser)
        {
            DaybookLeadList response = new DaybookLeadList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    var reader = await connection.QueryMultipleAsync(SP_GetDaybook_ByUserId, new
                    {
                        ActionUser = ActionUser
                    }, commandType: CommandType.StoredProcedure);
                    response.FreshLeads = await reader.ReadAsync<SalesLeadDTO>();
                    response.FollowUp = await reader.ReadAsync<SalesLeadDTO>();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return response;
        }
    }
}
