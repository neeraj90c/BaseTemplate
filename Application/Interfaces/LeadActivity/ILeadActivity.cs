using Application.DTOs.LeadGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.LeadActivity
{
    public interface ILeadActivity
    {
        public Task<LeadActivityList> CreateLeadActivity(CreateActivityDTO createActivityDTO);
        public Task<LeadActivityList> UpdateLeadActivity(UpdateActivityDTO updateActivityDTO);
        public Task<LeadActivityList> DeleteLeadActivity(DeleteActivityDTO deleteActivityDTO);
        public Task<LeadActivityList> GetAllLeadActivity(int LeadId);

    }
}
