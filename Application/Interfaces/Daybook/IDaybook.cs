using Application.DTOs.LeadGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Daybook
{
    public interface IDaybook
    {
        public Task<DaybookLeadList> GetDaybook_ByUserId(int ActionUser);
    }
}
