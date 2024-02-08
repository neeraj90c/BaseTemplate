using PushNotification.Interface;
using PushNotifications.Interface;
using PushNotifications.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;
using System.Xml.Linq;

namespace PushNotifications.Service
{
    public class ConnectionConfigService : IConnectionConfig
    {
        private const string SP_DBConnectionMaster_CRUD = "ann.DBConnectionMaster_CRUD";
        private const string SP_DBConnectionMaster_Delete = "ann.DBConnectionMaster_Delete";
        public ConnectionList ConnectionConfigInsert(ConnectionConfigDTO connectionConfigDTO)
        {
            ConnectionList response = new ConnectionList();

            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            {
                response.connectionList = connection.Query<ConnectionConfigDTO>(SP_DBConnectionMaster_CRUD, new
                {
                    DBConnId = connectionConfigDTO.DBConnId,
                    ConnName = connectionConfigDTO.ConnName,
                    ServerName = connectionConfigDTO.ServerName,
                    UserName = connectionConfigDTO.UserName,
                    Passwrd = connectionConfigDTO.Passwrd,
                    DBName = connectionConfigDTO.DBName,
                    IsActive = connectionConfigDTO.IsActive ? 1 : 0,
                    IsDeleted = connectionConfigDTO.IsActive ? 0 : 1,
                    ActionUser = connectionConfigDTO.ActionUser,

                }, commandType: CommandType.StoredProcedure);

            }
            return response;
        }

        public ConnectionList GetConnectionList()
        {

            ConnectionList response = new ConnectionList();

            SqlConnection connection = new SqlConnection(SessionObject.DBConn);
            {
                response.connectionList = connection.Query<ConnectionConfigDTO>(SP_DBConnectionMaster_CRUD, new
                {
                    DBConnId = 0,
                    ConnName = "",
                    ServerName = "",
                    UserName = "",
                    Passwrd = "",
                    DBName = "",
                    IsActive = 0,
                    IsDeleted = 0,
                    ActionUser = 0,

                }, commandType: CommandType.StoredProcedure);

            }
            return response;
        }

        public void DeleteDBConfig(ConnectionConfigDTO connectionConfigDTO)
        {
            using(SqlConnection connection = new SqlConnection(SessionObject.DBConn))
            {
                connection.Query<ConnectionConfigDTO>(SP_DBConnectionMaster_Delete, new
                {
                    DBConnId = connectionConfigDTO.DBConnId,
                    ActionUser = connectionConfigDTO.ActionUser,

                }, commandType: CommandType.StoredProcedure);

            }
        }
        
    }
}
