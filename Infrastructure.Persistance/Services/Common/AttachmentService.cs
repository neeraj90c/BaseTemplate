using Application.DTOs.Common;
using Application.Interfaces.Common;
using Dapper;
using Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.Services.Common
{
    public class AttachmentService : DABase, IAttachment
    {
        private readonly ILogger<AttachmentService> _logger;

        private const string SP_AttachmentMaster_Insert = "ana.AttachmentMaster_Insert";
        private const string SP_AttachmentMaster_Update = "ana.AttachmentMaster_Update";
        private const string SP_AttachmentMaster_Delete = "ana.AttachmentMaster_Delete";
        private const string SP_AttachmentMaster_ReadByMasterId = "ana.AttachmentMaster_ReadByMasterId";
        private const string SP_AttachmentMaster_ReadByGUID = "ana.AttachmentMaster_ReadByGUID";
        private const string SP_AttachmentAllowedExtension_ReadAll = "ana.AttachmentAllowedExtension_ReadAll";

        public AttachmentService(IOptions<ConnectionSettings> connectionSettings, ILogger<AttachmentService> logger)
            : base(connectionSettings.Value.AppKeyPath)
        {
            _logger = logger;
        }

        public async Task<AttachmentDTO> CreateAttachment(AttachmentDTO attachmentDTO)
        {
            AttachmentDTO response;
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QueryFirstOrDefaultAsync<AttachmentDTO>(SP_AttachmentMaster_Insert, new
                    {
                        MasterId = attachmentDTO.MasterId,
                        MasterType = attachmentDTO.MasterType,
                        FileName = attachmentDTO.FileName,
                        GUID = attachmentDTO.GUID,
                        FileType = attachmentDTO.FileType,
                        Extension = attachmentDTO.Extension,
                        FileSizeBytes = attachmentDTO.FileSizeBytes,
                        Description = attachmentDTO.Description,
                        Path = attachmentDTO.Path,
                        URL = attachmentDTO.URL,
                        ActionUser = attachmentDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to insert attachment metadata for {attachmentDTO.MasterType}/{attachmentDTO.MasterId}");
                throw;
            }

            return response;
        }

        public async Task<AttachmentDTO> UpdateAttachment(UpdateAttachmentDTO updateAttachmentDTO)
        {
            AttachmentDTO response;
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QueryFirstOrDefaultAsync<AttachmentDTO>(SP_AttachmentMaster_Update, new
                    {
                        AttachmentId = updateAttachmentDTO.AttachmentId,
                        FileName = updateAttachmentDTO.FileName,
                        Description = updateAttachmentDTO.Description,
                        ActionUser = updateAttachmentDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to update attachment {updateAttachmentDTO.AttachmentId}");
                throw;
            }

            return response;
        }

        public async Task DeleteAttachment(DeleteAttachmentDTO deleteAttachmentDTO)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    await connection.ExecuteAsync(SP_AttachmentMaster_Delete, new
                    {
                        AttachmentId = deleteAttachmentDTO.AttachmentId,
                        ActionUser = deleteAttachmentDTO.ActionUser
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to soft-delete attachment {deleteAttachmentDTO.AttachmentId}");
                throw;
            }
        }

        public async Task<AttachmentList> GetAttachmentsByMasterId(long masterId, string masterType)
        {
            AttachmentList response = new AttachmentList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<AttachmentDTO>(SP_AttachmentMaster_ReadByMasterId, new
                    {
                        MasterId = masterId,
                        MasterType = masterType
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to read attachments for {masterType}/{masterId}");
                throw;
            }

            return response;
        }

        public async Task<AttachmentDTO> GetAttachmentByGUID(string guid)
        {
            AttachmentDTO response;
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response = await connection.QueryFirstOrDefaultAsync<AttachmentDTO>(SP_AttachmentMaster_ReadByGUID, new
                    {
                        GUID = guid
                    }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to read attachment by GUID {guid}");
                throw;
            }

            return response;
        }

        public async Task<AllowedExtensionList> GetAllowedExtensions()
        {
            AllowedExtensionList response = new AllowedExtensionList();
            try
            {
                using (SqlConnection connection = new SqlConnection(base.ConnectionString))
                {
                    response.Items = await connection.QueryAsync<AllowedExtensionDTO>(SP_AttachmentAllowedExtension_ReadAll, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to read allowed attachment extensions");
                throw;
            }

            return response;
        }
    }
}
