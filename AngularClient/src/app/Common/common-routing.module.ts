import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageRolesComponent } from './admin/manage-roles/manage-roles.component';
import { ManageMenuComponent } from './admin/manage-menu/manage-menu.component';
import { UserComponent } from './user/user/user.component';
import { ManageSubrolesComponent } from './admin/manage-subroles/manage-subroles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ManageUsergroupComponent } from './admin/manage-usergroup/manage-usergroup.component';
import { CreateTicketComponent } from '../ticket/create-ticket/create-ticket.component';
import { ActiveTicketsComponent } from '../ticket/create-ticket/active-tickets/active-tickets.component';
import { AdminDashboardComponent } from '../ticket/admin-dashboard/admin-dashboard.component';
import { AssignedToMeComponent } from '../ticket/worklist/assigned-to-me/assigned-to-me.component';
import { AssignedToOthersComponent } from '../ticket/worklist/assigned-to-others/assigned-to-others.component';
import { ClosedTicketComponent } from '../ticket/worklist/closed-ticket/closed-ticket.component';
import { OpenTicketComponent } from '../ticket/worklist/open-ticket/open-ticket.component';
import { ViewTicketComponent } from '../ticket/worklist/view-ticket/view-ticket.component';
import { WorkInProgressComponent } from '../ticket/worklist/work-in-progress/work-in-progress.component';
import { WorklistComponent } from '../ticket/worklist/worklist.component';
import { ManageCompanyComponent } from './admin/manage-company/manage-company.component';
import { InProgressComponent } from '../ticket/create-ticket/in-progress/in-progress.component';
import { ClosedTicketsComponent } from '../ticket/create-ticket/closed-tickets/closed-tickets.component';





const routes: Routes = [
  {
    path: '', component: NavbarComponent, children: [
      { path: '', component: WelcomeComponent, title: 'TechnoTech ERP' },
      { path: 'base', component: BaseComponent, title: 'Base' },
      { path: 'DB', component: DashboardComponent, title: 'Dashboard' },
      { path: 'RAD', component: ManageRolesComponent, title: 'UserRoles' },
      { path: 'MAD', component: ManageMenuComponent, title: 'Manage Menu' },
      { path: 'USRL', component: UserComponent, title: 'User' },
      { path: 'SAD', component: ManageSubrolesComponent, title: 'Manage Subroles' },
      { path: 'USR', component: UserDashboardComponent, title: 'User Dashboard' },
      { path: 'UGAD', component: ManageUsergroupComponent, title: 'Manage UserGroup' },
      {
        path: 'CSD', component: CreateTicketComponent, title: 'Create Ticket', children: [
          { path: '', redirectTo: 'active-tickets', pathMatch: 'full' },
          { path: 'active-tickets', component: ActiveTicketsComponent, title: 'Active Tickets' },
          { path: 'in-progress', component: InProgressComponent, title: 'In Progress Tickets' },
          { path: 'closed-tickets', component: ClosedTicketsComponent, title: 'Closed Tickets' },
        ]
      },
      { path: 'SDAD', component: AdminDashboardComponent, title: 'Admin Dashboard' },

      {
        path: 'WDB', component: WorklistComponent, title: 'Worklist', children: [
          { path: '', redirectTo: 'work-in-progress', pathMatch: 'full' },
          { path: 'work-in-progress', component: WorkInProgressComponent, title: 'Work In Progress' },
          { path: 'assigned-to-me', component: AssignedToMeComponent, title: 'Assigned To Me' },
          { path: 'open-tickets', component: OpenTicketComponent, title: 'Open Tickets' },
          { path: 'closed-tickets', component: ClosedTicketComponent, title: 'Closed Tickets' },
          { path: 'assigned-to-others', component: AssignedToOthersComponent, title: 'Assigned To Others' }
        ]
      },
      { path: 'view-ticket/:id', component: ViewTicketComponent, title: 'View Ticket' },
      { path: 'MCAD', component: ManageCompanyComponent, title: 'Manage Company' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
