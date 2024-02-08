using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PushNotification.Model
{
    public class SchedularConfigDTO
    {
        public int SchedularId { get; set;}
        public string IName   { get; set;}
        public string ICode { get; set;}
        public string IDesc   { get; set;}
        public int FrequencyInMinutes { get; set;}
        public string SchedularType   { get; set;}
        public bool IsActive { get; set;}
        public int? IsDeleted   { get; set;}
        public int? ActionUser {  get; set;}
    }

    public class SchedularList
    {
        public IEnumerable<SchedularConfigDTO> schedularList {  get; set;}
    }
}
