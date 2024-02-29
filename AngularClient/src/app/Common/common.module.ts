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
import { WorklistComponent } from '../Ticket/worklist/worklist.component';
import { WorkInProgressComponent } from '../Ticket/worklist/work-in-progress/work-in-progress.component';
import { AssignedToMeComponent } from '../Ticket/worklist/assigned-to-me/assigned-to-me.component';
import { OpenTicketComponent } from '../Ticket/worklist/open-ticket/open-ticket.component';
import { ClosedTicketComponent } from '../Ticket/worklist/closed-ticket/closed-ticket.component';
import { AssignedToOthersComponent } from '../Ticket/worklist/assigned-to-others/assigned-to-others.component';
import { ViewTicketComponent } from '../Ticket/worklist/view-ticket/view-ticket.component';
import { ManageCompanyComponent } from './admin/manage-company/manage-company.component';
import { ManageUsergroupComponent } from './admin/manage-usergroup/manage-usergroup.component';
import { CreateTicketComponent } from '../Ticket/create-ticket/create-ticket.component';
import { AdminDashboardComponent } from '../Ticket/admin-dashboard/admin-dashboard.component';
import { ActiveTicketsComponent } from '../Ticket/create-ticket/active-tickets/active-tickets.component';



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
    ActiveTicketsComponent

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
