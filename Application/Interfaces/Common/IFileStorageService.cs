using System.Threading.Tasks;

namespace Application.Interfaces.Common
{
    /// <summary>
    /// Abstraction over "where attachment bytes physically live". Everything
    /// upstream (AttachmentController, AttachmentService/DB metadata) only ever
    /// deals with the GUID/Path/URL this returns - none of it knows the storage
    /// is local disk today. Swapping to S3/Blob later means implementing this
    /// interface again, not touching every caller.
    /// </summary>
    public interface IFileStorageService
    {
        Task<FileStorageResult> SaveAsync(byte[] content, string originalFileName);

        Task<byte[]> ReadAsync(string relativePath);

        void Delete(string relativePath);
    }

    public class FileStorageResult
    {
        public string GUID { get; set; }
        public string StoredFileName { get; set; }

        // Path relative to the configured attachment root - this is what gets
        // persisted in AttachmentMaster.Path and handed back to Delete()/ReadAsync().
        public string RelativePath { get; set; }

        public string URL { get; set; }
        public long FileSizeBytes { get; set; }
        public string Extension { get; set; }
    }
}
