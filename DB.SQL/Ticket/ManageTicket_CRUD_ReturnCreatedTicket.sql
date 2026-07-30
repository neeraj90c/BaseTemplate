/*
================================================================================
 Fix: [spd].[ManageTicket_CRUD] never returns the created/updated ticket.

 The original proc's final SELECT (which both TicketService.cs and Angular's
 ticket.service.ts already expect - see TicketService.cs's
 `response.Tickets = await connection.QueryAsync<SupportTicketDTO>(...)` and
 TicketList { tickets: SupportTicketDTO[] } in ticket.interface.ts) was
 commented out in the source script, and had no WHERE clause even if
 uncommented (it would have returned every ticket, not just this one).

 This matters now because the Angular "create ticket, then upload staged
 attachments" flow needs the new TicketId back from this exact call - without
 it there's no MasterId to attach files to.

 Idempotent: CREATE OR ALTER, safe to run any number of times. Requires
 SQL Server 2016 SP1+ / Azure SQL, matching DB.SQL/Attachment/AttachmentMaster.sql.
================================================================================
*/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [spd].[ManageTicket_CRUD]
(
    @TicketId BIGINT,
    @Title VARCHAR(200),
    @TDesc	NVARCHAR(MAX),
    @TType VARCHAR(50),
    @Category VARCHAR(50),
    @TagList VARCHAR(100),
    @AssignedTo VARCHAR(50),
    @TicketStatus VARCHAR(50),
    @TPriority VARCHAR(50),
    @AffectsCustomer VARCHAR(50),
    @AppVersion VARCHAR(20),
    @EstimatedDuration VARCHAR(50),
    @ActualDuration VARCHAR(50),
    @TargetDate VARCHAR(100),
	@Department VARCHAR(100),
	@RaisedBy VARCHAR(100),
	@AddField3 VARCHAR(500),
	@AddField4 VARCHAR(500),
	@AddField5 VARCHAR(500),
    @IsActive BIT = 1,
    @IsDeleted BIT = 0,
    @ActionUser VARCHAR(50),
	@ProjectId INT,
	@CompanyId INT
)
AS
BEGIN
    DECLARE @ActionUserName VARCHAR(200) = '',
			@ActivityComment VARCHAR(500) = '';

	BEGIN TRY
		IF EXISTS( SELECT 1 FROM [ana].[UserMaster] WITH (NOLOCK) WHERE UserId = @ActionUser)
		BEGIN
			SELECT TOP 1 @ActionUserName = (ISNULL(FirstName,'') + ' ' + ISNULL(MiddleName,'') + ' ' + ISNULL(LastName,'') )
			FROM [ana].[UserMaster] WITH (NOLOCK) WHERE UserId = @ActionUser;
		END
	END TRY
	BEGIN CATCH
		--Do Nothing
	END CATCH

    IF NOT EXISTS(SELECT 1 FROM [spd].[SupportTickets] WHERE TicketId = @TicketId) AND
		(LTRIM(RTRIM(ISNULL(@Title,''))) <> '' AND
		 LTRIM(RTRIM(ISNULL(@TType,''))) <> '')
    BEGIN
	   IF NOT EXISTS(SELECT 1 FROM [spd].[SupportTickets]
				   WHERE CompanyId = @CompanyId
				   AND Title=@Title
				   AND TDesc = @TDesc
				   AND DATEADD(MINUTE,1,CreatedOn) > GETDATE())
		BEGIN
			INSERT INTO [spd].[SupportTickets]
			(Title,TDesc,TType,Category,TagList,TicketOwner,AssignedTo,TicketStatus,TPriority,AffectsCustomer,
			 AppVersion,DueDate,EstimatedDuration,ActualDuration,TargetDate,ResolutionDate,Department,RaisedBy,AddField3,AddField4,AddField5,IsActive,IsDeleted,CreatedBy,CreatedOn,
			 ModifiedBy,ModifiedOn,ProjectId,CompanyId
			)
			VALUES
			(@Title,@TDesc,@TType,@Category,@TagList,@ActionUser,@AssignedTo,'Open',@TPriority,@AffectsCustomer,
			 @AppVersion,NULL,@EstimatedDuration,@ActualDuration,@TargetDate,NULL,@Department,@RaisedBy,@AddField3,@AddField4,@AddField5,1,0,@ActionUser,GETDATE(),
			 NULL,GETDATE(),@ProjectId,@CompanyId
			);

			SELECT @TicketId = SCOPE_IDENTITY();

			SET @ActivityComment = (@ActionUserName + ' created the Ticket');

			INSERT INTO [spd].[TicketActivity] (TicketId, TicketComments, IsDeleted, CreatedBy, CreatedOn)
			VALUES (@TicketId, @ActivityComment,0,@ActionUser,GETDATE())
		END
    END
    ELSE IF EXISTS(SELECT 1 FROM [spd].[SupportTickets] WHERE TicketId = @TicketId AND(
			ISNULL(Title,'') <> ISNULL(@Title,'') OR
			ISNULL(TDesc,'') <> ISNULL(@TDesc,'') OR
            ISNULL(TType,'') <> ISNULL(@TType,'') OR
			ISNULL(ProjectId,'') <> ISNULL(@ProjectId,'') OR
			ISNULL(CompanyId,'') <> ISNULL(@CompanyId,'') OR
            ISNULL(Category,'') <> ISNULL(@Category,'') OR
            ISNULL(TagList,'') <> ISNULL(@TagList,'') OR
            ISNULL(AssignedTo,'') <> ISNULL(@AssignedTo,'') OR
            ISNULL(TicketStatus,'') <> ISNULL(@TicketStatus,'') OR
            ISNULL(TPriority,'') <> ISNULL(@TPriority,'') OR
            ISNULL(AffectsCustomer,'') <> ISNULL(@AffectsCustomer,'') OR
            ISNULL(AppVersion,'') <> ISNULL(@AppVersion,'') OR
            ISNULL(EstimatedDuration,'') <> ISNULL(@EstimatedDuration,'') OR
            ISNULL(ActualDuration,'') <> ISNULL(@ActualDuration,'') OR
            ISNULL(TargetDate,'') <> ISNULL(@TargetDate,'') OR
			ISNULL(Department,'') <> ISNULL(@Department,'') OR
			ISNULL(RaisedBy,'') <> ISNULL(@RaisedBy,'') OR
			ISNULL(AddField3,'') <> ISNULL(@AddField3,'') OR
			ISNULL(AddField4,'') <> ISNULL(@AddField4,'') OR
			ISNULL(AddField5,'') <> ISNULL(@AddField5,'') OR
            ISNULL(IsActive,'') <> ISNULL(@IsActive,'') OR
            ISNULL(IsDeleted,'') <> ISNULL(@IsDeleted,'') OR
            ISNULL(ModifiedBy,'') <> ISNULL(@ActionUser,'') OR
            ISNULL(ModifiedOn,'') <> GETDATE()
	))
    BEGIN
        UPDATE [spd].[SupportTickets]
        SET
            Title = @Title,
            TDesc = @TDesc,
            TType = @TType,
			ProjectId = @ProjectId,
			CompanyId = @CompanyId,
            Category = @Category,
            TagList = @TagList,
            AssignedTo = @AssignedTo,
            TicketStatus = @TicketStatus,
            TPriority = @TPriority,
            AffectsCustomer = @AffectsCustomer,
            AppVersion = @AppVersion,
            EstimatedDuration = @EstimatedDuration,
            ActualDuration = @ActualDuration,
            TargetDate = @TargetDate,
			Department = @Department,
			RaisedBy = @RaisedBy,
			AddField3 = @AddField3,
			AddField4 = @AddField4,
			AddField5 = @AddField5,
            IsActive = @IsActive,
            IsDeleted = @IsDeleted,
            ModifiedBy = @ActionUser,
            ModifiedOn = GETDATE()
        WHERE TicketId = @TicketId;

		SET @ActivityComment = (@ActionUserName + ' updated the Ticket');

		INSERT INTO [spd].[TicketActivity] (TicketId, TicketComments, IsDeleted, CreatedBy, CreatedOn)
		VALUES (@TicketId, @ActivityComment,0,@ActionUser,GETDATE())
    END

    -- Restored and scoped to just this ticket (the original had no WHERE at
    -- all, which would have returned the whole table instead of the one row
    -- the caller actually needs the new TicketId from).
    SELECT A.TicketId, A.Title, A.TDesc AS TicketDesc, A.TType AS TicketType, A.Category, A.TagList, A.TicketOwner, A.AssignedTo, A.TicketStatus,
           A.TPriority As TicketPriority, A.AffectsCustomer, A.AppVersion, A.DueDate, A.EstimatedDuration, A.ActualDuration, A.TargetDate, A.ResolutionDate,
           A.Department, A.RaisedBy, A.AddField3, A.AddField4, A.AddField5, A.IsActive, A.IsDeleted, A.CreatedBy, A.CreatedOn, A.ModifiedBy, A.ModifiedOn,
		   A.ProjectId, B.PName ProjectName,
		   A.CompanyId, C.CName CompanyName
    FROM [spd].[SupportTickets] A WITH (NOLOCK)
	LEFT OUTER JOIN spd.SupportProjectMaster B WITH (NOLOCK)
	ON A.ProjectId = B.ProjectId AND A.IsDeleted = 0
	LEFT OUTER JOIN ana.CompanyMaster C WITH (NOLOCK)
	ON A.CompanyId = C.CompanyId
	WHERE A.TicketId = @TicketId;
END
GO
