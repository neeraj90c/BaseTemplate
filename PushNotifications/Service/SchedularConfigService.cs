using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PushNotification.Interface;
using PushNotification.Model;
using System.Data.SqlClient;
using System.Data;
using PushNotifications;
using Dapper;
using PushNotifications.Model;

namespace PushNotification.Service
{
    public class SchedularService : ISchedularConfig
    {
        
        private const string SP_AlertsServiceSchedular_GetAll = "ann.AlertsServiceSchedular_GetAll";
        private const string SP_AlertSchedular_CRUD = "ann.AlertsSchedular_CRUD";
        private const string SP_AlertSchedular_Delete = "ann.AlertsSchedular_Delete";

        public SchedularList AlertsSchedularGetALL()
        {
            SchedularList response = new SchedularList();
            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            {
                response.schedularList = connection.Query<SchedularConfigDTO>(SP_AlertsServiceSchedular_GetAll, commandType: CommandType.StoredProcedure);
            }
            return response;
        }

        public SchedularList CreateAlertsSchedular(SchedularConfigDTO schedularConfigDTO)
        {
            SchedularList response = new SchedularList();
            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            {
                response.schedularList = connection.Query<SchedularConfigDTO>(SP_AlertSchedular_CRUD, new
                {
                    SchedularId = schedularConfigDTO.SchedularId,
                    IName = schedularConfigDTO.IName,
                    ICode = schedularConfigDTO.ICode,
                    IDesc = schedularConfigDTO.IDesc,
                    FrequencyInMinutes = schedularConfigDTO.FrequencyInMinutes,
                    SchedularType = schedularConfigDTO.SchedularType,
                    IsActive = schedularConfigDTO.IsActive,
                    IsDeleted = schedularConfigDTO.IsDeleted,
                    ActionUser = 0

                } ,commandType: CommandType.StoredProcedure);
            }
            return response;
        }
        public void DeleteSchedular(SchedularConfigDTO schedularConfigDTO)
        {
            using(SqlConnection connection = new SqlConnection(SessionObject.DBConn))
            {
                connection.Query<SchedularConfigDTO>(SP_AlertSchedular_Delete, new
                {
                    SchedularId = schedularConfigDTO.SchedularId,
                    ActionUser = schedularConfigDTO.ActionUser

                }, commandType: CommandType.StoredProcedure);
            }
        }




    }
}
