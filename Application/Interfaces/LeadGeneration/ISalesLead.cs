using Application.DTOs.LeadGeneration;
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
        public Task<SalesLeadList> GetAllSalesLead();
        public Task<SalesLeadDTO> ReadSalesLeadByLeadId(int LeadId);
    }
}
