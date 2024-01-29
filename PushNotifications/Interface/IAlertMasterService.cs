using PushNotifications.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotifications.Interface
{
    public interface IAlertMasterService
    {
        public void AlertMasterServiceInsert(AlertServiceMasterDTO alertServiceMasterDTO, AlertServiceMapping alertServiceMapping);
        public AlertServiceList AlertMasterServiceGetAll();
        public void AlertSchedularMapInsert(AlertServiceMapping alertServiceMapping);



    }
}
