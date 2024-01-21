using Application.DTOs.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Admin
{
    public interface IRole
    {
        public Task<RolesList> ManageRoles(RolesDTO rolesDTO);
    }
}
