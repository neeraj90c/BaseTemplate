using Application.Interfaces.Common;
using Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Infrastructure.Shared.Services
{
    /// <summary>
    /// Local-disk implementation of IFileStorageService. Mirrors the existing
    /// convention already used by WebAPI's RTEUploadController.UploadDocument
    /// (GUID-prefixed filename, year/month/day subfolders under the content
    /// root, DocumentUploadBaseUrl as the public URL prefix) so attachments
    /// look and behave the same as the RTE's existing uploads on disk.
    /// </summary>
    internal class LocalDiskFileStorageService : IFileStorageService
    {
        private readonly APISettings _settings;
        private readonly ILogger<LocalDiskFileStorageService> _logger;

        public LocalDiskFileStorageService(IOptions<APISettings> settings, ILogger<LocalDiskFileStorageService> logger)
        {
            _settings = settings.Value;
            _logger = logger;
        }

        private string GetRootPath()
        {
            string configuredPath = string.IsNullOrWhiteSpace(_settings.AttachmentUploadPath)
                ? "Client\\Attachments"
                : _settings.AttachmentUploadPath;

            return Path.Combine(Directory.GetCurrentDirectory(), configuredPath);
        }

        public async Task<FileStorageResult> SaveAsync(byte[] content, string originalFileName)
        {
            if (content == null || content.Length == 0)
                throw new ArgumentException("File content is empty.", nameof(content));

            string extension = Path.GetExtension(originalFileName)?.ToLowerInvariant();
            string guid = Guid.NewGuid().ToString();
            string storedFileName = $"{guid}_{Path.GetFileName(originalFileName)}";

            DateTime now = DateTime.Now;
            string relativeFolder = Path.Combine(now.Year.ToString(), now.Month.ToString("00"), now.Day.ToString("00"));
            string relativePath = Path.Combine(relativeFolder, storedFileName);

            string fullFolder = Path.Combine(GetRootPath(), relativeFolder);
            if (!Directory.Exists(fullFolder))
                Directory.CreateDirectory(fullFolder);

            string fullPath = Path.Combine(fullFolder, storedFileName);

            using (var fileStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
            {
                await fileStream.WriteAsync(content, 0, content.Length);
            }

            string url = $"{_settings.DocumentUploadBaseUrl}/{(_settings.AttachmentUploadPath ?? "Client\\Attachments").Replace('\\', '/')}/{relativePath.Replace('\\', '/')}";

            _logger.LogInformation($"Saved attachment {originalFileName} to {fullPath}");

            return new FileStorageResult
            {
                GUID = guid,
                StoredFileName = storedFileName,
                RelativePath = relativePath,
                URL = url,
                FileSizeBytes = content.LongLength,
                Extension = extension
            };
        }

        public async Task<byte[]> ReadAsync(string relativePath)
        {
            string fullPath = Path.Combine(GetRootPath(), relativePath);
            if (!File.Exists(fullPath))
                throw new FileNotFoundException($"Attachment file not found at {fullPath}");

            return await File.ReadAllBytesAsync(fullPath);
        }

        public void Delete(string relativePath)
        {
            try
            {
                string fullPath = Path.Combine(GetRootPath(), relativePath);
                if (File.Exists(fullPath))
                    File.Delete(fullPath);
            }
            catch (Exception ex)
            {
                // Best-effort cleanup - a leftover file on disk is harmless; we
                // must not let a delete failure here surface as an API error.
                _logger.LogWarning(ex, $"Failed to delete attachment file at {relativePath}");
            }
        }
    }
}
