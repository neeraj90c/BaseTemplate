/*
================================================================================
 Feature   : Generic Attachment support (SalesLead, SupportTickets, LeadActivity,
              TicketActivity, and any future module) via polymorphic
              MasterId + MasterType association.
 Schema    : ana  (existing cross-cutting / common schema)
 Notes     : Single-tenant build - no CompanyId column by design.
             Follows existing TemplateDB conventions:
               - separate Insert/Update/Delete/Read procs (see lg.LeadContact_*)
               - soft delete via IsActive/IsDeleted flags, no hard deletes
               - CreatedBy/ModifiedBy as VARCHAR(50), CreatedOn/ModifiedOn as GETDATE()
               - SELECT * / explicit column list returned after Insert/Update

 IDEMPOTENCY: This script is safe to run against the same database any number
 of times.
   - Tables   : guarded with IF OBJECT_ID(...) IS NULL before CREATE TABLE.
   - Indexes  : guarded with a sys.indexes existence check before CREATE INDEX.
   - Procs    : use CREATE OR ALTER, so re-running updates the definition
                in place instead of failing on "object already exists".
   - Seed data: each row is guarded with its own IF NOT EXISTS check, so
                re-running does not duplicate rows, and appending a new seed
                row later only inserts what's missing.
================================================================================
*/

-------------------------------------------------------------------------------
-- 1. TABLE: ana.AttachmentMaster
-------------------------------------------------------------------------------
IF OBJECT_ID(N'[ana].[AttachmentMaster]', N'U') IS NULL
BEGIN
	CREATE TABLE [ana].[AttachmentMaster](
		[AttachmentId]  [bigint] IDENTITY(1,1) NOT NULL,
		[MasterId]      [bigint] NOT NULL,
		[MasterType]    [varchar](50) NOT NULL,
		[FileName]      [varchar](255) NULL,
		[GUID]          [varchar](50) NOT NULL,
		[FileType]      [varchar](50) NULL,
		[Extension]     [varchar](10) NOT NULL,
		[FileSizeBytes] [bigint] NULL,
		[Description]   [varchar](250) NULL,
		[Path]          [nvarchar](400) NULL,
		[URL]           [nvarchar](400) NOT NULL,
		[IsActive]      [int] NULL,
		[IsDeleted]     [int] NULL,
		[CreatedBy]     [varchar](50) NULL,
		[CreatedOn]     [datetime] NULL,
		[ModifiedBy]    [varchar](50) NULL,
		[ModifiedOn]    [datetime] NULL,
	 CONSTRAINT [PK_AttachmentMaster] PRIMARY KEY CLUSTERED
	(
		[AttachmentId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
END
GO

-- Every real query pattern (list attachments for a lead/ticket/activity) filters
-- on MasterType + MasterId and excludes deleted rows, so index for that directly.
IF NOT EXISTS (
	SELECT 1 FROM sys.indexes
	WHERE name = N'IX_AttachmentMaster_MasterType_MasterId'
	  AND object_id = OBJECT_ID(N'[ana].[AttachmentMaster]')
)
BEGIN
	CREATE NONCLUSTERED INDEX [IX_AttachmentMaster_MasterType_MasterId]
	ON [ana].[AttachmentMaster] ([MasterType] ASC, [MasterId] ASC)
	INCLUDE ([FileName], [URL], [Extension], [FileSizeBytes], [CreatedOn])
	WHERE ([IsDeleted] = 0)
	WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END
GO

-- GUID is what the download endpoint will key off (never expose AttachmentId/Path
-- directly), so it needs to be looked up quickly and must not collide.
IF NOT EXISTS (
	SELECT 1 FROM sys.indexes
	WHERE name = N'IX_AttachmentMaster_GUID'
	  AND object_id = OBJECT_ID(N'[ana].[AttachmentMaster]')
)
BEGIN
	CREATE UNIQUE NONCLUSTERED INDEX [IX_AttachmentMaster_GUID]
	ON [ana].[AttachmentMaster] ([GUID] ASC)
	WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END
GO

-------------------------------------------------------------------------------
-- 2. TABLE: ana.AttachmentAllowedExtension
--    Config-driven extension/size whitelist instead of the hardcoded
--    switch-case currently in WebAPI's RTEUploadController.
-------------------------------------------------------------------------------
IF OBJECT_ID(N'[ana].[AttachmentAllowedExtension]', N'U') IS NULL
BEGIN
	CREATE TABLE [ana].[AttachmentAllowedExtension](
		[ExtensionId]  [int] IDENTITY(1,1) NOT NULL,
		[Extension]    [varchar](10) NOT NULL,
		[FileType]     [varchar](50) NULL,
		[MaxSizeBytes] [bigint] NULL,
		[IsActive]     [int] NULL,
		[IsDeleted]    [int] NULL,
		[CreatedBy]    [varchar](50) NULL,
		[CreatedOn]    [datetime] NULL,
		[ModifiedBy]   [varchar](50) NULL,
		[ModifiedOn]   [datetime] NULL,
	 CONSTRAINT [PK_AttachmentAllowedExtension] PRIMARY KEY CLUSTERED
	(
		[ExtensionId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
END
GO

IF NOT EXISTS (
	SELECT 1 FROM sys.indexes
	WHERE name = N'IX_AttachmentAllowedExtension_Extension'
	  AND object_id = OBJECT_ID(N'[ana].[AttachmentAllowedExtension]')
)
BEGIN
	CREATE UNIQUE NONCLUSTERED INDEX [IX_AttachmentAllowedExtension_Extension]
	ON [ana].[AttachmentAllowedExtension] ([Extension] ASC)
	WHERE ([IsDeleted] = 0)
	WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END
GO

-- Seed with the extensions RTEUploadController already allows today, so behavior
-- doesn't change on cutover - only becomes configurable going forward.
-- Each row is individually guarded so re-running (or later appending a new
-- extension to this list) never creates duplicates.
IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.jpg')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.jpg', 'image', 4000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.jpeg')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.jpeg', 'image', 4000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.png')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.png', 'image', 4000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.pdf')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.pdf', 'document', 10000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.doc')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.doc', 'document', 10000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.docx')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.docx', 'document', 10000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.xls')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.xls', 'document', 10000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.xlsx')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.xlsx', 'document', 10000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.rtf')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.rtf', 'document', 10000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.txt')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.txt', 'document', 2000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.zip')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.zip', 'archive', 20000000, 1, 0, 'SYSTEM', GETDATE());

IF NOT EXISTS (SELECT 1 FROM [ana].[AttachmentAllowedExtension] WHERE Extension = '.rar')
	INSERT INTO [ana].[AttachmentAllowedExtension] ([Extension], [FileType], [MaxSizeBytes], [IsActive], [IsDeleted], [CreatedBy], [CreatedOn])
	VALUES ('.rar', 'archive', 20000000, 1, 0, 'SYSTEM', GETDATE());
GO

-------------------------------------------------------------------------------
-- 3. PROC: ana.AttachmentMaster_Insert
--    Metadata row is written AFTER the file is already on disk (GUID/Path/URL
--    are generated by the API before calling this). If this insert fails, the
--    API is responsible for deleting the orphaned file it just wrote.
-------------------------------------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [ana].[AttachmentMaster_Insert]
(
	@MasterId      BIGINT,
	@MasterType    VARCHAR(50),
	@FileName      VARCHAR(255),
	@GUID          VARCHAR(50),
	@FileType      VARCHAR(50),
	@Extension     VARCHAR(10),
	@FileSizeBytes BIGINT,
	@Description   VARCHAR(250),
	@Path          NVARCHAR(400),
	@URL           NVARCHAR(400),
	@ActionUser    VARCHAR(50)
)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO [ana].[AttachmentMaster]
	(
		MasterId, MasterType, FileName, GUID, FileType, Extension, FileSizeBytes,
		Description, Path, URL, IsActive, IsDeleted, CreatedBy, CreatedOn
	)
	VALUES
	(
		@MasterId, @MasterType, @FileName, @GUID, @FileType, @Extension, @FileSizeBytes,
		@Description, @Path, @URL, 1, 0, @ActionUser, GETDATE()
	);

	SELECT * FROM [ana].[AttachmentMaster] WHERE AttachmentId = SCOPE_IDENTITY();
END
GO

-------------------------------------------------------------------------------
-- 4. PROC: ana.AttachmentMaster_Update
--    Metadata-only edit (Description/FileName). Re-uploading a file is treated
--    as delete-old + insert-new per the "no versioning" decision, not an update.
-------------------------------------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [ana].[AttachmentMaster_Update]
(
	@AttachmentId BIGINT,
	@FileName     VARCHAR(255),
	@Description  VARCHAR(250),
	@ActionUser   VARCHAR(50)
)
AS
BEGIN
	SET NOCOUNT ON;

	IF EXISTS (SELECT 1 FROM [ana].[AttachmentMaster] WHERE AttachmentId = @AttachmentId AND IsDeleted = 0)
	BEGIN
		UPDATE [ana].[AttachmentMaster]
		SET
			FileName   = @FileName,
			Description = @Description,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE AttachmentId = @AttachmentId;
	END

	SELECT * FROM [ana].[AttachmentMaster] WHERE AttachmentId = @AttachmentId;
END
GO

-------------------------------------------------------------------------------
-- 5. PROC: ana.AttachmentMaster_Delete
--    Soft delete only - the physical file is left on disk. If disk usage ever
--    becomes a concern, a separate cleanup job can sweep IsDeleted=1 rows past
--    a retention window; that's a deliberate later decision, not part of this cut.
-------------------------------------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [ana].[AttachmentMaster_Delete]
(
	@AttachmentId BIGINT,
	@ActionUser   VARCHAR(50)
)
AS
BEGIN
	SET NOCOUNT ON;

	IF EXISTS (SELECT 1 FROM [ana].[AttachmentMaster] WHERE AttachmentId = @AttachmentId)
	BEGIN
		UPDATE [ana].[AttachmentMaster]
		SET
			IsActive   = 0,
			IsDeleted  = 1,
			ModifiedBy = @ActionUser,
			ModifiedOn = GETDATE()
		WHERE AttachmentId = @AttachmentId;
	END
END
GO

-------------------------------------------------------------------------------
-- 6. PROC: ana.AttachmentMaster_ReadByMasterId
--    Primary listing query used by the shared Angular attachment component -
--    e.g. AttachmentMaster_ReadByMasterId 123, 'SalesLead'
-------------------------------------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [ana].[AttachmentMaster_ReadByMasterId]
(
	@MasterId   BIGINT,
	@MasterType VARCHAR(50)
)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		AttachmentId, MasterId, MasterType, FileName, GUID, FileType, Extension,
		FileSizeBytes, Description, Path, URL, IsActive, IsDeleted,
		CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
	FROM [ana].[AttachmentMaster] WITH (NOLOCK)
	WHERE MasterId = @MasterId AND MasterType = @MasterType AND IsDeleted = 0
	ORDER BY CreatedOn DESC;
END
GO

-------------------------------------------------------------------------------
-- 7. PROC: ana.AttachmentMaster_ReadByGUID
--    Backs the download/stream endpoint. The API exposes only the GUID in
--    URLs it hands to the browser, never the AttachmentId or the disk Path.
-------------------------------------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [ana].[AttachmentMaster_ReadByGUID]
(
	@GUID VARCHAR(50)
)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		AttachmentId, MasterId, MasterType, FileName, GUID, FileType, Extension,
		FileSizeBytes, Description, Path, URL, IsActive, IsDeleted,
		CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
	FROM [ana].[AttachmentMaster] WITH (NOLOCK)
	WHERE GUID = @GUID AND IsDeleted = 0;
END
GO

-------------------------------------------------------------------------------
-- 8. PROC: ana.AttachmentAllowedExtension_ReadAll
--    Drives both server-side validation and the Angular upload control's
--    accept-list, so the two stay in sync without a code change on either side.
-------------------------------------------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [ana].[AttachmentAllowedExtension_ReadAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ExtensionId, Extension, FileType, MaxSizeBytes, IsActive
	FROM [ana].[AttachmentAllowedExtension] WITH (NOLOCK)
	WHERE IsActive = 1 AND IsDeleted = 0
	ORDER BY Extension;
END
GO
