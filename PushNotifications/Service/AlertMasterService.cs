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
        private const string SP_AlertsServiceVariables_CRUD = "ann.AlertsServiceVariables_CRUD";
        private const string SP_AlertsServiceMaster_ReadById = "ann.AlertsServiceMaster_ReadById";
        private const string SP_AlertsServiceVariables_ReadByAlertServiceId = "ann.AlertsServiceVariables_ReadByAlertServiceId";


        public AlertServiceMasterDTO AlertMasterServiceInsert(AlertServiceMasterDTO alertServiceMasterDTO)
        {
            AlertServiceMasterDTO response = new AlertServiceMasterDTO();

            try
            {
                using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
                {
                    response = connection.QuerySingle<AlertServiceMasterDTO>(SP_AdvancedAlertsServiceMaster_INSERT, new
                    {
                        ServiceId = alertServiceMasterDTO.ServiceId,
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
                        StartsFrom = alertServiceMasterDTO.StartDate,
                        EndsOn = alertServiceMasterDTO.EndDate,
                        DailyStartOn = alertServiceMasterDTO.DailyStart,
                        DailyEndsOn = alertServiceMasterDTO.DailyEnd,

                    }, commandType: CommandType.StoredProcedure);


                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return response;

            
        }

        public AlertServiceList AlertMasterServiceGetAll()
        {
            AlertServiceMasterDTO alertServiceMasterDTO = new AlertServiceMasterDTO();
            AlertServiceList response = new AlertServiceList();

            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            response.alertServiceList = connection.Query<AlertServiceMasterDTO>(SP_AlertsServiceMaster_GetAll, commandType: CommandType.StoredProcedure);

            return response;
        }

        public AlertVariableList AlertVariableCRUD(AlertVariableMapping alertVariableMapping)
        {
            
            AlertVariableList result = new AlertVariableList();

            using (SqlConnection connection = new SqlConnection(SessionObject.DBConn))
            {
                    result.list = connection.Query<AlertVariableMapping>(SP_AlertsServiceVariables_CRUD, new
                    {
                        VariableId = alertVariableMapping.VariableId,
                        ServiceId = alertVariableMapping.ServiceId,
                        VarInstance = alertVariableMapping.VarInstance,
                        VarValue = alertVariableMapping.VarValue,
                        VarType = alertVariableMapping.VarType,
                        IsActive = alertVariableMapping.IsActive,
                        IsDeleted = alertVariableMapping.IsDeleted,
                        ActionUser = alertVariableMapping.ActionUser

                    }, commandType: CommandType.StoredProcedure);

            }
            return result;
        }

        public AlertServiceMasterDTO AlertMasterServiceReadByID( int serviceId)
        {
            AlertServiceMasterDTO alertServiceMasterDTO = new AlertServiceMasterDTO();
            AlertServiceMasterDTO response = new AlertServiceMasterDTO();

            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            response = connection.QuerySingle<AlertServiceMasterDTO>(SP_AlertsServiceMaster_ReadById, new
            {
                ServiceId = serviceId
            } ,commandType: CommandType.StoredProcedure);

            return response;
        }

        public AlertVariableList AlertVariableReadById(int serviceId)
        {
            AlertVariableList response = new AlertVariableList();
            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            response.list = connection.Query<AlertVariableMapping>(SP_AlertsServiceVariables_ReadByAlertServiceId, new
            {
                ServiceId = serviceId
            }, commandType: CommandType.StoredProcedure);

            return response;
        }


    }



    
}
