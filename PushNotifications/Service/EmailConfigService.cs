using PushNotification.Interface;
using PushNotification.Model;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;
using System.Configuration;
using PushNotifications;
using Dapper;

public class EmailConfigService : IEmailConfig
{
    private const string SP_GetEmailConfigDetails = "ann.GetEmailConfigDetails";
    private const string SP_EmailConfig_CRUD = "ann.EmailConfig_CRUD";

    public EmailConfigurationList InsertEmailConfig(EmailConfigurationDTO emailConfig)
    {
        EmailConfigurationList response = new EmailConfigurationList();
        //string ConnectionService = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
        SqlConnection connection = new SqlConnection(SessionObject.DBConn);
        {
            response.emailConfigList = connection.Query<EmailConfigurationDTO>(SP_EmailConfig_CRUD,new
            {
                EmailConfigId = emailConfig.EmailConfigId,
                IName = emailConfig.IName,
                IDesc = emailConfig.IDesc,
                IHost = emailConfig.IHost,
                IPort = emailConfig.IPort,
                IFrom = emailConfig.IFrom,
                IPassword = emailConfig.IPassword,
                IEnableSsl = emailConfig.IEnableSsl ? 1 : 0,
                IsBodyHtml = emailConfig.IsBodyHtml ? 1 : 0,
                IsActive = emailConfig.IsActive ? 1 : 0,
                IsDeleted = emailConfig.IsActive ? 0 : 1,
                ActionUser = 0
            } ,commandType: CommandType.StoredProcedure);

        }
        return response;
    }



    public EmailConfigurationList GetEmailConfigDetails()
    {
        EmailConfigurationList response = new EmailConfigurationList();

        using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
        {
            response.emailConfigList = connection.Query<EmailConfigurationDTO>(SP_GetEmailConfigDetails, commandType: CommandType.StoredProcedure);

        }
        return response;
    }

    
}
