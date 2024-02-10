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



@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    NavbarComponent,
    ManageRolesComponent,
    ManageMenuComponent,
    UserComponent,
    ManageSubrolesComponent,

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
