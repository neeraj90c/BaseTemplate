﻿using NotificationService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationService.Interface
{
    public interface IEmailConfiguration
    {
        EmailConfigurationList GetEmailConfigDetails();
    }
}
