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
        public AlertServiceMasterDTO AlertMasterServiceInsert(AlertServiceMasterDTO alertServiceMasterDTO);
        public AlertServiceList AlertMasterServiceGetAll();
        public AlertVariableList AlertVariableCRUD(AlertVariableMapping alertVariableMapping);
        public AlertServiceMasterDTO AlertMasterServiceReadByID(int serviceId);



        //public void AlertSchedularMapInsert(AlertServiceMapping alertServiceMapping);



    }
}
