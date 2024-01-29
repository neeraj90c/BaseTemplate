using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotifications.Model
{
    public class ConnectionConfigDTO
    {
        public int DBConnId { get; set; }
        public string ConnName { get; set; }
        public string ServerName { get; set; }
        public string UserName { get; set; }
        public string Passwrd { get; set; }
        public string DBName { get; set; }
        public bool IsActive { get; set; }
        public int ActionUser { get; set; }
    }

    public class ConnectionList
    {
        public IEnumerable<ConnectionConfigDTO> connectionList {  get; set; }
    }
}
