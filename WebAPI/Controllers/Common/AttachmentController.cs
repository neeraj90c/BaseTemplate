using Application.DTOs.Common;
using Application.Features.Common.Commands;
using Application.Interfaces.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers.Common
{
    /// <summary>
    /// Generic attachment endpoints usable by any module (SalesLead, SupportTickets,
    /// LeadActivity, TicketActivity, ...) via masterId + masterType - see
    /// DB.SQL/Attachment/AttachmentMaster.sql for the schema this backs.
    /// </summary>
    // Bound as a single model rather than several scattered [FromForm] scalar
    // parameters on the action - mixing IFormFile with independent [FromForm]
    // primitives on one method signature is a known Swashbuckle schema-generation
    // trip-up (throws when /swagger/v1/swagger.json is first requested).
    public class UploadAttachmentRequest
    {
        public IFormFile File { get; set; }
        public long MasterId { get; set; }
        public string MasterType { get; set; }
        public string Description { get; set; }
        public string ActionUser { get; set; }
    }

    [Route("attachment")]
    public class AttachmentController : BaseApiController
    {
        private readonly IFileStorageService _fileStorage;
        private readonly ILogger<AttachmentController> _logger;

        public AttachmentController(IFileStorageService fileStorage, ILogger<AttachmentController> logger)
        {
            _fileStorage = fileStorage;
            _logger = logger;
        }

        [HttpPost("Upload")]
        [RequestSizeLimit(50_000_000)]
        public async Task<IActionResult> Upload([FromForm] UploadAttachmentRequest request)
        {
            var file = request?.File;

            if (file == null || file.Length <= 0)
                return BadRequest("Invalid file.");

            if (string.IsNullOrWhiteSpace(request.MasterType))
                return BadRequest("masterType is required.");

            long masterId = request.MasterId;
            string masterType = request.MasterType;
            string description = request.Description;
            string actionUser = request.ActionUser;

            string extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();

            var allowedExtensions = await mediator.Send(new GetAllowedExtensionsCommand());
            var allowed = allowedExtensions?.Items?.FirstOrDefault(x => x.Extension == extension);

            if (allowed == null)
                return BadRequest($"File extension '{extension}' is not allowed.");

            if (file.Length > allowed.MaxSizeBytes)
                return BadRequest($"File exceeds the maximum allowed size of {allowed.MaxSizeBytes} bytes for '{extension}' files.");

            byte[] content;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                content = memoryStream.ToArray();
            }

            // File goes to disk first, metadata second - see the SQL script header
            // for why (a dangling file is harmless, a DB row with no file is not).
            var stored = await _fileStorage.SaveAsync(content, file.FileName);

            try
            {
                var attachmentDTO = new AttachmentDTO
                {
                    MasterId = masterId,
                    MasterType = masterType,
                    FileName = file.FileName,
                    GUID = stored.GUID,
                    FileType = allowed.FileType,
                    Extension = stored.Extension,
                    FileSizeBytes = stored.FileSizeBytes,
                    Description = description,
                    Path = stored.RelativePath,
                    URL = stored.URL,
                    ActionUser = actionUser
                };

                var response = await mediator.Send(new CreateAttachmentCommand { attachmentDTO = attachmentDTO });
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Metadata insert failed after the file was already written -
                // clean up the orphan rather than leaving it stranded on disk.
                _logger.LogError(ex, $"Attachment metadata insert failed after file write for {masterType}/{masterId}; deleting orphaned file {stored.RelativePath}");
                _fileStorage.Delete(stored.RelativePath);
                throw;
            }
        }

        [HttpGet("GetByMaster/{masterType}/{masterId}")]
        public async Task<IActionResult> GetByMaster(string masterType, long masterId)
        {
            var response = await mediator.Send(new GetAttachmentsByMasterIdCommand { MasterId = masterId, MasterType = masterType });
            return Ok(response);
        }

        [HttpGet("Download/{guid}")]
        public async Task<IActionResult> Download(string guid)
        {
            var attachment = await mediator.Send(new GetAttachmentByGUIDCommand { GUID = guid });
            if (attachment == null)
                return NotFound("Attachment not found.");

            byte[] content = await _fileStorage.ReadAsync(attachment.Path);
            return File(content, GetContentType(attachment.Extension), attachment.FileName);
        }

        [HttpPost("UpdateAttachment")]
        public async Task<IActionResult> Update([FromBody] UpdateAttachmentDTO updateAttachmentDTO)
        {
            var response = await mediator.Send(new UpdateAttachmentCommand { updateAttachmentDTO = updateAttachmentDTO });

            if (response == null)
                return NotFound("Failed to update attachment.");

            return Ok(response);
        }

        [HttpPost("DeleteAttachment")]
        public async Task<IActionResult> Delete([FromBody] DeleteAttachmentDTO deleteAttachmentDTO)
        {
            await mediator.Send(new DeleteAttachmentCommand { deleteAttachmentDTO = deleteAttachmentDTO });
            return Ok();
        }

        [HttpGet("AllowedExtensions")]
        public async Task<IActionResult> AllowedExtensions()
        {
            var response = await mediator.Send(new GetAllowedExtensionsCommand());
            return Ok(response);
        }

        private static string GetContentType(string extension)
        {
            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".pdf" => "application/pdf",
                ".doc" => "application/msword",
                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".xls" => "application/vnd.ms-excel",
                ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".rtf" => "application/rtf",
                ".txt" => "text/plain",
                ".zip" => "application/zip",
                ".rar" => "application/vnd.rar",
                _ => "application/octet-stream"
            };
        }
    }
}
