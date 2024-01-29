using PushNotification.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Interface
{
    public interface IEmailConfig
    {
        public EmailConfigurationList InsertEmailConfig(EmailConfigurationDTO emailConfig);
        public EmailConfigurationList GetEmailConfigDetails();
    }
}
