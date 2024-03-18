using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.LeadGeneration
{
    public class LeadContactDetailDTO
    {
        public int ContactId { get; set; }
        public int LeadId { get; set; }
        public string CName { get; set; }
        public string CNumber { get; set; }
        public string CEmail { get; set; }
        public string CDesignation { get; set; }
        public string CDesc { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ActionUser {  get; set; }
    }

    public class LeadContactDetailList
    {
        public IEnumerable<LeadContactDetailDTO> Items { get; set; }
    }

}
