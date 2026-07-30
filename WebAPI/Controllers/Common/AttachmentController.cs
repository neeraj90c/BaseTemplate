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
        public async Task<IActionResult> Upload()
        {
            // Reading Request.Form directly instead of relying on [FromForm]
            // complex-object model binding - the latter kept returning "Invalid
            // file." with request.File null despite the browser sending a real
            // file (see conversation history: ruled out ErrorHandlerMiddleware's
            // body buffering as the cause after fixing it and still hitting this).
            // Request.Form/Request.Form.Files reads the multipart body directly
            // via ASP.NET Core's own form feature, sidestepping whatever the
            // complex-type binder was doing wrong. The error message below is
            // temporarily verbose on purpose - it reports exactly what the server
            // parsed so the next failure (if any) is diagnosable from the browser
            // Network tab alone, without needing server log access.
            if (!Request.HasFormContentType)
                return BadRequest($"Expected multipart/form-data, got Content-Type: '{Request.ContentType}'.");

            var form = await Request.ReadFormAsync();
            var file = form.Files["File"];

            if (file == null || file.Length <= 0)
            {
                return BadRequest(
                    $"Invalid file. [debug: filesInForm={form.Files.Count}, " +
                    $"fileKeys=[{string.Join(",", form.Files.Select(f => f.Name))}], " +
                    $"formFieldKeys=[{string.Join(",", form.Keys)}]]");
            }

            string masterType = form["MasterType"];
            if (string.IsNullOrWhiteSpace(masterType))
                return BadRequest("masterType is required.");

            long masterId = long.TryParse(form["MasterId"], out var parsedMasterId) ? parsedMasterId : 0;
            string description = form["Description"];
            string actionUser = form["ActionUser"];

            string extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();

            // No server-side extension filtering, by request - not a whitelist,
            // not a denylist, nothing. AttachmentPickerComponent on the Angular
            // side is the only place any extension check happens now (it calls
            // GetAllowedExtensionsCommand to build its accept-list/limits, purely
            // for UX). Anyone hitting this endpoint directly (Postman, a script,
            // curl, etc.) can upload literally any file type - including
            // executables/scripts - up to the [RequestSizeLimit] above. That is
            // a deliberate, explicit tradeoff made in conversation, not an
            // oversight - revisit if this endpoint is ever exposed beyond
            // trusted internal users.
            var allowedExtensions = await mediator.Send(new GetAllowedExtensionsCommand());
            var allowed = allowedExtensions?.Items?.FirstOrDefault(x => x.Extension == extension);
            string fileType = allowed?.FileType ?? (string.IsNullOrEmpty(extension) ? "Other" : extension.TrimStart('.').ToUpperInvariant());

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
                    FileType = fileType,
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

        // ?inline=true renders the file in-browser (images/PDFs open in a new
        // tab instead of triggering Save As) by setting Content-Disposition:
        // inline instead of the default attachment. Types with no browser-native
        // viewer (docx, xlsx, zip, ...) still fall back to a download even with
        // inline=true - that's the browser's own behavior, not this endpoint's.
        // Plain Download (no query param, or inline=false) is unchanged - still
        // forces Save As via the File(..., fileDownloadName) overload below.
        [HttpGet("Download/{guid}")]
        public async Task<IActionResult> Download(string guid, [FromQuery] bool inline = false)
        {
            var attachment = await mediator.Send(new GetAttachmentByGUIDCommand { GUID = guid });
            if (attachment == null)
                return NotFound("Attachment not found.");

            byte[] content = await _fileStorage.ReadAsync(attachment.Path);
            string contentType = GetContentType(attachment.Extension);

            if (inline)
            {
                Response.Headers["Content-Disposition"] = $"inline; filename=\"{attachment.FileName}\"";
                return File(content, contentType);
            }

            return File(content, contentType, attachment.FileName);
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
