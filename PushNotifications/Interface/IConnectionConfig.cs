using PushNotifications.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotifications.Interface
{
    public interface IConnectionConfig
    {
        public ConnectionList ConnectionConfigInsert(ConnectionConfigDTO connectionConfigDTO);
        public ConnectionList GetConnectionList();
    }
}
