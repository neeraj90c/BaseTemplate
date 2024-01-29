using Dapper;
using PushNotifications.Interface;
using PushNotifications.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.Tab;

namespace PushNotifications.Service
{
    public class AlertMasterService : IAlertMasterService
    {
        private const string SP_AdvancedAlertsServiceMaster_INSERT = "ann.AdvancedAlertsServiceMaster_INSERT";
        private const string SP_AlertsServiceMaster_GetAll = "ann.AlertsServiceMaster_GetAll";
        private const string SP_AlertsServiceSchedular_INSERT = "ann.AlertsServiceSchedular_INSERT";


        public void AlertMasterServiceInsert(AlertServiceMasterDTO alertServiceMasterDTO, AlertServiceMapping alertServiceMapping)
        {
            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            {
               connection.Query(SP_AdvancedAlertsServiceMaster_INSERT, new
                {
                    ServiceId = 0,
                    Title = alertServiceMasterDTO.Title,
                    SDesc = alertServiceMasterDTO.SDesc,
                    AlertType = alertServiceMasterDTO.AlertType,
                    HasAttachment = alertServiceMasterDTO.HasAttachment,
                    AttachmentType = alertServiceMasterDTO.AttachmentType,
                    AttachmentPath = alertServiceMasterDTO.AttachmentPath,
                    AttachmentFileType = alertServiceMasterDTO.AttachmentFileType,
                    OutputFileName = alertServiceMasterDTO.OutputFileName,
                    DataSourceType = alertServiceMasterDTO.DataSourceType,
                    DataSourceDef = alertServiceMasterDTO.DataSourceDef,
                    PostSendDataSourceType = alertServiceMasterDTO.PostSendDataSourceType,
                    PostSendDataSourceDef = alertServiceMasterDTO.PostSendDataSourceDef,
                    EmailTo = alertServiceMasterDTO.EmailTo,
                    CCTo = alertServiceMasterDTO.CCTo,
                    BccTo = alertServiceMasterDTO.BccTo,
                    ASubject = alertServiceMasterDTO.ASubject,
                    ABody = alertServiceMasterDTO.ABody,
                    DBConnid = alertServiceMasterDTO.DBConnid,
                    AlertConfigId = alertServiceMasterDTO.AlertConfigId,
                    SchedularId = alertServiceMasterDTO.SchedularId,
                    ActionUser = 0,
                    StartsFrom = alertServiceMapping.StartDate,
                    EndsOn = alertServiceMapping.EndDate,
                    DailyStartOn = alertServiceMapping.DailyStart,
                    DailyEndsOn = alertServiceMapping.DailyEnd,
                    VarInstance = alertServiceMapping.varInstance,
                    VarValue = alertServiceMapping.varValue,
                    VarType = alertServiceMapping.varType

                }, commandType: CommandType.StoredProcedure);
            }

            
        }

        public AlertServiceList AlertMasterServiceGetAll()
        {
            AlertServiceMasterDTO alertServiceMasterDTO = new AlertServiceMasterDTO();
            AlertServiceList response = new AlertServiceList();

            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            response.alertServiceList = connection.Query<AlertServiceMasterDTO>(SP_AlertsServiceMaster_GetAll, commandType: CommandType.StoredProcedure);

            return response;
        }

        public void AlertSchedularMapInsert(AlertServiceMapping alertServiceMapping)
        {
            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            connection.Query(SP_AlertsServiceSchedular_INSERT,new
            {
                ServiceId = alertServiceMapping.ServiceId,
                SchedularId = alertServiceMapping.SchedularId,
                StartsFrom = alertServiceMapping.StartDate,
                EndsOn = alertServiceMapping.EndDate,
                DailyStartOn = alertServiceMapping.DailyStart,
                DailyEndsOn = alertServiceMapping.DailyEnd,
                VarInstance = alertServiceMapping.varInstance,
                VarValue = alertServiceMapping.varValue,
                VarType = alertServiceMapping.varType,
                ActionUser = 0
            } ,commandType: CommandType.StoredProcedure);

        }

    }



    
}
