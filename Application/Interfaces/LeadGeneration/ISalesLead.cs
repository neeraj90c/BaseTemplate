using Application.DTOs.LeadGeneration;
using Application.DTOs.SupportDesk;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.LeadGeneration
{
    public interface ISalesLead
    {
        public Task<SalesLeadDTO> CreateSalesLead(SalesLeadDTO salesLeadDTO);
        public Task<SalesLeadDTO> UpdateSalesLead(SalesLeadDTO salesLeadDTO);
        public Task DeleteSalesLead(long leadId, int actionUser);
        public Task<SalesLeadList> GetAllSalesLead(GetAllSalesLeadByUserIdDTO getAllSalesLeadByUserIdDTO);
        public Task<SalesLeadDTO> ReadSalesLeadByLeadId(long LeadId);
        public Task<LeadAsigneeList> AssignLead(AssignLeadDTO assignLeadDTO);
        public Task<LeadAsigneeList> UpdateLeadAssignee(AssignLeadDTO assignLeadDTO);
        public Task<LeadAsigneeList> DeleteLeadAssignee(AssignLeadDTO assignLeadDTO);
        public Task<LeadAsigneeList> GetAssingeeListByLeadId(int LeadId);
        public Task<ProjectList> GetAllProjectList();


    }
}
