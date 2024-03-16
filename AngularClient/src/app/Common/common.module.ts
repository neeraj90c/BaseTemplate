import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ValidationInterceptor } from '../validation.interceptor';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonRoutingModule } from './common-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageRolesComponent } from './admin/manage-roles/manage-roles.component';
import { ManageMenuComponent } from './admin/manage-menu/manage-menu.component';
import { UserComponent } from './user/user/user.component';
import { ManageSubrolesComponent } from './admin/manage-subroles/manage-subroles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { WorklistComponent } from '../ticket/worklist/worklist.component';
import { WorkInProgressComponent } from '../ticket/worklist/work-in-progress/work-in-progress.component';
import { AssignedToMeComponent } from '../ticket/worklist/assigned-to-me/assigned-to-me.component';
import { OpenTicketComponent } from '../ticket/worklist/open-ticket/open-ticket.component';
import { ClosedTicketComponent } from '../ticket/worklist/closed-ticket/closed-ticket.component';
import { AssignedToOthersComponent } from '../ticket/worklist/assigned-to-others/assigned-to-others.component';
import { ViewTicketComponent } from '../ticket/worklist/view-ticket/view-ticket.component';
import { ManageCompanyComponent } from './admin/manage-company/manage-company.component';
import { ManageUsergroupComponent } from './admin/manage-usergroup/manage-usergroup.component';
import { CreateTicketComponent } from '../ticket/create-ticket/create-ticket.component';
import { AdminDashboardComponent } from '../ticket/admin-dashboard/admin-dashboard.component';
import { ActiveTicketsComponent } from '../ticket/create-ticket/active-tickets/active-tickets.component';
import { InProgressComponent } from '../ticket/create-ticket/in-progress/in-progress.component';
import { ClosedTicketsComponent } from '../ticket/create-ticket/closed-tickets/closed-tickets.component';
import { LeadGenerationComponent } from '../salesLead/lead-generation/lead-generation.component';
import { LeadDetailsComponent } from '../salesLead/lead-details/lead-details.component';
import { ActiveLeadsComponent } from '../salesLead/lead-generation/active-leads/active-leads.component';
import { InprogressLeadsComponent } from '../salesLead/lead-generation/inprogress-leads/inprogress-leads.component';
import { ClosedLeadsComponent } from '../salesLead/lead-generation/closed-leads/closed-leads.component';
import { SuccessLeadsComponent } from '../salesLead/lead-generation/success-leads/success-leads.component';
import { LeadWorklistComponent } from '../salesLead/lead-worklist/lead-worklist.component';
import { LeadInProgressComponent } from '../salesLead/lead-worklist/lead-in-progress/lead-in-progress.component';
import { LeadAssignedToMeComponent } from '../salesLead/lead-worklist/lead-assigned-to-me/lead-assigned-to-me.component';
import { CloseLeadsComponent } from '../salesLead/lead-worklist/close-leads/close-leads.component';
import { LeadAssignedToOthersComponent } from '../salesLead/lead-worklist/lead-assigned-to-others/lead-assigned-to-others.component';
import { LeadSuccessComponent } from '../salesLead/lead-worklist/lead-success/lead-success.component';
import { OpenLeadsComponent } from '../salesLead/lead-worklist/open-leads/open-leads.component';



@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    NavbarComponent,
    ManageRolesComponent,
    ManageMenuComponent,
    UserComponent,
    ManageSubrolesComponent,
    WelcomeComponent,
    UserDashboardComponent,
    WorklistComponent,
    WorkInProgressComponent,
    AssignedToMeComponent,
    OpenTicketComponent,
    ClosedTicketComponent,
    AssignedToOthersComponent,
    ViewTicketComponent,
    ManageCompanyComponent,
    ManageUsergroupComponent,
    CreateTicketComponent,
    AdminDashboardComponent,
    ActiveTicketsComponent,
    InProgressComponent,
    ClosedTicketsComponent,
    LeadGenerationComponent,
    LeadDetailsComponent,
    ActiveLeadsComponent,
    InprogressLeadsComponent,
    ClosedLeadsComponent,
    SuccessLeadsComponent,
    LeadWorklistComponent,
    LeadInProgressComponent,
    LeadAssignedToMeComponent,
    CloseLeadsComponent,
    LeadAssignedToOthersComponent,
    LeadSuccessComponent,
    OpenLeadsComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidationInterceptor,
      multi: true,
    }
  ],
})
export class CommonMainModule { }
