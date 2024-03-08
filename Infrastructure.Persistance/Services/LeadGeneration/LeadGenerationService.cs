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
        private const string SP_GetAllSalesLead = "lg.GetAllSalesLead";


        private const string SP_AssignSalesLead = "lg.AssignSalesLead";
        private const string SP_UpdateLeadAssignee = "lg.UpdateLeadAssignee";
        private const string SP_DeleteLeadAssignee = "lg.DeleteLeadAssignee";
        private const string SP_ReadAssigneeByLeadId = "lg.ReadAssigneeByLeadId";



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
        public async Task<SalesLeadList> GetAllSalesLead()
        {
            SalesLeadList response = new SalesLeadList();
            _logger.LogInformation($"Started fetching SalesLead");

            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<SalesLeadDTO>(SP_GetAllSalesLead, commandType: CommandType.StoredProcedure);
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
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_AssignSalesLead , new
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

        public async Task<LeadAsigneeList> GetAssingeeListByLeadId(AssignLeadDTO assignLeadDTO)
        {
            LeadAsigneeList response = new LeadAsigneeList();
            _logger.LogInformation($"Started updating Lead Assignment for LAid {assignLeadDTO.LAid}");
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<LeadAsigneeDTO>(SP_ReadAssigneeByLeadId, new
                    {
                        LeadId = assignLeadDTO.LeadId,

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
