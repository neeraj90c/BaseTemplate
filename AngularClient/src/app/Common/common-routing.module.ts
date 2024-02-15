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
import { WorklistComponent } from '../Ticket/worklist/worklist.component';




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
      { path: 'WDB', component: WorklistComponent, title: 'Worklist' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
