using Application.DTOs.LeadGeneration;
using Application.Interfaces.LeadActivity;
using Application.Interfaces.LeadGeneration;
using Dapper;
using Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.Services.LeadGeneration
{
    public class LeadActivityService : DABase,ILeadActivity
    {
        APISettings _settings;
        private ILogger<LeadActivityService> _logger;
        private const string SP_CreateLeadActivity = "lg.CreateLeadActivity";
        private const string SP_UpdateLeadActivity = "lg.UpdateLeadActivity";
        private const string SP_DeleteLeadActivity = "lg.DeleteLeadActivity";
        private const string SP_GetAllActivityByLeadId = "lg.GetAllActivityByLeadId";

        public LeadActivityService(IOptions<ConnectionSettings> connectionSettings, ILogger<LeadActivityService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }

        public async Task<LeadActivityList> CreateLeadActivity(CreateActivityDTO createActivityDTO)
        {
            LeadActivityList response = new LeadActivityList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadActivityDTO>(SP_CreateLeadActivity, new
                    {
                        LeadId = createActivityDTO.LeadId,
                        LeadComments = createActivityDTO.LeadComments,
                        ActionUser = createActivityDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            

            return response;
        }

        public async Task<LeadActivityList> UpdateLeadActivity(UpdateActivityDTO updateActivityDTO)
        {
            LeadActivityList response = new LeadActivityList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadActivityDTO>(SP_UpdateLeadActivity, new
                    {
                        LeadActivityId = updateActivityDTO.LeadActivityId,
                        LeadId = updateActivityDTO.LeadId,
                        LeadComments = updateActivityDTO.LeadComments,
                        ActionUser = updateActivityDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }


            return response;
        }

        public async Task<LeadActivityList> DeleteLeadActivity(DeleteActivityDTO deleteActivityDTO)
        {
            LeadActivityList response = new LeadActivityList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadActivityDTO>(SP_DeleteLeadActivity, new
                    {
                        LeadActivityId = deleteActivityDTO.LeadActivityId,  
                        ActionUser = deleteActivityDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }


            return response;
        }
        public async Task<LeadActivityList> GetAllLeadActivity(int LeadId)
        {
            LeadActivityList response = new LeadActivityList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadActivityDTO>(SP_GetAllActivityByLeadId, new
                    {
                        LeadId = LeadId,
                    }, commandType: CommandType.StoredProcedure);
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
