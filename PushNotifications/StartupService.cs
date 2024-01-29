using Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace PushNotifications
{
    public class StartupService
    {
        
        public void OnServiceStart()
        {

            string appKeyPath = ConfigurationManager.AppSettings["AppKeyPath"];

            if (appKeyPath != null)
            {
                Console.WriteLine("AppKeyPath: " + appKeyPath);
                SessionObject.DBConn = DBConn.GetConnectionString(appKeyPath);
            }
           
        }
    }
}
