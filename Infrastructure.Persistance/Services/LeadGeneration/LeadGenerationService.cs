using Application.DTOs.LeadGeneration;
using Application.DTOs.SupportDesk;
using Application.Interfaces.LeadGeneration;
using Dapper;
using Domain.Settings;
using Infrastructure.Persistance.Services.SupportDesk;
using MediatR;
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
    public class LeadGenerationService : DABase , ISalesLead
    {
        APISettings _settings;
        private ILogger<LeadGenerationService> _logger;
        private const string SP_CreateSalesLead = "lg.CreateSalesLead";
        private const string SP_DeleteSalesLead = "lg.DeleteSalesLead";
        private const string SP_UpdateSalesLead = "lg.UpdateSalesLead";
        private const string SP_ReadSalesLeadByLeadId = "lg.ReadSalesLeadByLeadId";
        private const string SP_SalesLead_GetByUserId = "lg.SalesLead_GetByUserId";


        private const string SP_LeadAsignee_Insert = "lg.LeadAsignee_Insert";
        private const string SP_UpdateLeadAssignee = "lg.UpdateLeadAssignee";
        private const string SP_DeleteLeadAssignee = "lg.DeleteLeadAssignee";
        private const string SP_LeadAsignee_GetAllByLeadId = "lg.LeadAsignee_GetAllByLeadId";

        private const string SP_GetAllProjectList = "spd.GetAllProjectList";
        private const string SP_LeadResolverList = "lg.LeadResolverList";
        private const string SP_LeadAsignee_UpdateStatus = "lg.LeadAsignee_UpdateStatus";


        private const string SP_SalesLead_WorkList = "lg.SalesLead_WorkList";
        private const string SP_SalesLead_AssignToUser = "lg.SalesLead_AssignToUser";
        private const string SP_SalesLead_ForceClose = "lg.SalesLead_ForceClose";






        public LeadGenerationService(IOptions<ConnectionSettings> connectionSettings, ILogger<LeadGenerationService> logger, IOptions<APISettings> settings) : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
            _settings = settings.Value;
        }

        public async Task<SalesLeadDTO> CreateSalesLead(SalesLeadDTO salesLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();
            _logger.LogInformation($"Started creating SalesLead for project {salesLeadDTO.ProjectId}");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QuerySingleAsync<SalesLeadDTO>(SP_CreateSalesLead, new
                    {
                        ProjectId = salesLeadDTO.ProjectId,
                        CompanyId = salesLeadDTO.CompanyId,
                        LTitle = salesLeadDTO.LTitle,
                        LDesc = salesLeadDTO.LDesc,
                        Category = salesLeadDTO.Category,
                        TagList = salesLeadDTO.TagList,
                        LeadOwner = salesLeadDTO.LeadOwner,
                        LeadStatus = salesLeadDTO.LeadStatus,
                        LeadPriority = salesLeadDTO.LeadPriority,
                        LeadDate = salesLeadDTO.LeadDate,
                        NextFollowUpDate = salesLeadDTO.NextFollowUpDate,
                        AddField1 = salesLeadDTO.AddField1,
                        AddField2 = salesLeadDTO.AddField2,
                        AddField3 = salesLeadDTO.AddField3,
                        ActionUser = salesLeadDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task<SalesLeadDTO> UpdateSalesLead(SalesLeadDTO salesLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();
            _logger.LogInformation($"Started creating SalesLead for project {salesLeadDTO.ProjectId}");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QuerySingleAsync<SalesLeadDTO>(SP_UpdateSalesLead, new
                    {
                        LeadId = salesLeadDTO.LeadId,
                        ProjectId = salesLeadDTO.ProjectId,
                        CompanyId = salesLeadDTO.CompanyId,
                        LTitle = salesLeadDTO.LTitle,
                        LDesc = salesLeadDTO.LDesc,
                        Category = salesLeadDTO.Category,
                        TagList = salesLeadDTO.TagList,
                        LeadOwner = salesLeadDTO.LeadOwner,
                        LeadStatus = salesLeadDTO.LeadStatus,
                        LeadPriority = salesLeadDTO.LeadPriority,
                        LeadDate = salesLeadDTO.LeadDate,
                        NextFollowUpDate = salesLeadDTO.NextFollowUpDate,
                        AddField1 = salesLeadDTO.AddField1,
                        AddField2 = salesLeadDTO.AddField2,
                        AddField3 = salesLeadDTO.AddField3,
                        ActionUser = salesLeadDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task DeleteSalesLead(long leadId, int actionUser)
        {
            _logger.LogInformation($"Started deleting SalesLead for lead ID {leadId}");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    await connection.ExecuteAsync(SP_DeleteSalesLead, new
                    {
                        LeadId = leadId,
                        ActionUser = actionUser
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting SalesLead for lead ID {leadId}: {ex.Message}");
                throw;
            }
        }
        public async Task<SalesLeadList> GetAllSalesLead(GetAllSalesLeadByUserIdDTO getAllSalesLeadByUserIdDTO)
        {
            SalesLeadList response = new SalesLeadList();
            _logger.LogInformation($"Started fetching SalesLead");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    var reader = await connection.QueryMultipleAsync(SP_SalesLead_GetByUserId, new
                    {
                        ActionUser = getAllSalesLeadByUserIdDTO.ActionUser,
                        CompanyId = getAllSalesLeadByUserIdDTO.CompanyId
                    }, commandType: CommandType.StoredProcedure) ;
                    response.NewAndOpen = await reader.ReadAsync<SalesLeadDTO>();
                    response.InProgress = await reader.ReadAsync<SalesLeadDTO>();
                    response.Closed = await reader.ReadAsync<SalesLeadDTO>();
                    response.Success = await reader.ReadAsync<SalesLeadDTO>();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching SalesLead: {ex.Message}");
                throw;
            }
            return response;
        }

        public async Task<SalesLeadDTO> ReadSalesLeadByLeadId(long LeadId)
        {
            SalesLeadDTO response = new SalesLeadDTO();
            _logger.LogInformation($"Started fetching SalesLead for leadid {LeadId}");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QuerySingleAsync<SalesLeadDTO>(SP_ReadSalesLeadByLeadId, new
                    {
                        LeadId = LeadId

                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }

        public async Task<LeadAsigneeList> AssignLead(AssignLeadDTO assignLeadDTO)
        {
            LeadAsigneeList response  = new LeadAsigneeList();
            _logger.LogInformation($"Started creating Lead Assignment for leadid {assignLeadDTO.LeadId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_LeadAsignee_Insert, new
                    {
                        LeadId  = assignLeadDTO.LeadId,
                        AssignedTo = assignLeadDTO.AssignedTo,
                        ADesc   = assignLeadDTO.ADesc,
                        AStatus = assignLeadDTO.AStatus,
                        ActionUser = assignLeadDTO.ActionUser

                    },commandType:CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }

        public async Task<LeadAsigneeList> UpdateLeadAssignee(AssignLeadDTO assignLeadDTO)
        {
            LeadAsigneeList response = new LeadAsigneeList();
            _logger.LogInformation($"Started updating Lead Assignment for LAid {assignLeadDTO.LAid}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_UpdateLeadAssignee, new
                    {
                        LAid = assignLeadDTO.LAid,
                        LeadId = assignLeadDTO.LeadId,
                        AssignedTo = assignLeadDTO.AssignedTo,
                        ADesc = assignLeadDTO.ADesc,
                        AStatus = assignLeadDTO.AStatus,
                        ActionUser = assignLeadDTO.ActionUser

                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }
        public async Task<LeadAsigneeList> DeleteLeadAssignee(AssignLeadDTO assignLeadDTO)
        {
            LeadAsigneeList response = new LeadAsigneeList();
            _logger.LogInformation($"Started updating Lead Assignment for LAid {assignLeadDTO.LAid}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_DeleteLeadAssignee, new
                    {
                        LAid = assignLeadDTO.LAid,
                        ActionUser = assignLeadDTO.ActionUser

                    }, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }

        public async Task<LeadAsigneeList> GetAssingeeListByLeadId(int LeadId)
        {
            LeadAsigneeList response = new LeadAsigneeList();
            _logger.LogInformation($"Started updating Lead Assignment for LAid {LeadId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_LeadAsignee_GetAllByLeadId, new
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

        public async Task<ProjectList> GetAllProjectList()
        {
            ProjectList response = new ProjectList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<ProjectListDTO>(SP_GetAllProjectList, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;

        }

        public async Task<LeadResolverList> GetLeadResolverList()
        {
            LeadResolverList response = new LeadResolverList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadResolverDTO>(SP_LeadResolverList, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;

        }
        public async Task<LeadAsigneeList> LeadAsignee_UpdateStatus(LeadAsigneeDTO leadAsigneeDTO)
        {
            LeadAsigneeList response = new LeadAsigneeList();

            _logger.LogInformation($"Inserting Lead Asignee for Lead :  {leadAsigneeDTO.LeadId}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_LeadAsignee_UpdateStatus, new
                    {
                        LAId = leadAsigneeDTO.LAId,
                        AStatus = leadAsigneeDTO.AStatus,
                        ActionUser = leadAsigneeDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }

        public async Task<LeadWorkList> GetSalesLeadWorkList(GetWorkListDTO getWorkListDTO)
        {
            LeadWorkList response = new LeadWorkList();
            _logger.LogInformation($"Started fetching SalesLead");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    var reader = await connection.QueryMultipleAsync(SP_SalesLead_WorkList, new
                    {
                        ActionUser = getWorkListDTO.ActionUser,
                        CompanyId = getWorkListDTO.CompanyId,
                        StartDate = getWorkListDTO.StartDate,
                        EndDate = getWorkListDTO.EndDate
                    }, commandType: CommandType.StoredProcedure);
                    response.WorkInProgress = await reader.ReadAsync<SalesLeadDTO>();
                    response.AssignedToMe = await reader.ReadAsync<SalesLeadDTO>();
                    response.OpenLeads = await reader.ReadAsync<SalesLeadDTO>();
                    response.ClosedLeads = await reader.ReadAsync<SalesLeadDTO>();
                    response.AssignedToOthers = await reader.ReadAsync<SalesLeadDTO>();
                    response.Success = await reader.ReadAsync<SalesLeadDTO>();
                }
            }

            catch (Exception ex)
            {
                _logger.LogError($"Error fetching SalesLead: {ex.Message}");
                throw;
            }
            return response;
        }
        public async Task<SalesLeadDTO> SalesLeads_AssignToUser(AssignLeadDTO assignLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();

            _logger.LogInformation($"Assign the ticket : {assignLeadDTO.LeadId} to User : {assignLeadDTO.AssignedTo}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QueryFirstOrDefaultAsync<SalesLeadDTO>(SP_SalesLead_AssignToUser, new
                    {
                        LeadId = assignLeadDTO.LeadId,
                        AssignedTo = assignLeadDTO.AssignedTo,
                        ADesc = assignLeadDTO.ADesc,
                        AStatus = assignLeadDTO.AStatus,
                        ActionUser = assignLeadDTO.ActionUser,
                    }, commandType: CommandType.StoredProcedure);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return response;
        }

        public async Task<SalesLeadDTO> SalesLead_Forceclose(AssignLeadDTO assignLeadDTO)
        {
            SalesLeadDTO response = new SalesLeadDTO();

            _logger.LogInformation($"Assign the ticket : {assignLeadDTO.LeadId} to User : {assignLeadDTO.AssignedTo}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QueryFirstOrDefaultAsync<SalesLeadDTO>(SP_SalesLead_ForceClose, new
                    {
                        LeadId = assignLeadDTO.LeadId,
                        ActionUser = assignLeadDTO.ActionUser,
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
