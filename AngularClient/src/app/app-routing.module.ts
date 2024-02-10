import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'TechnoTech ERP - Login' },
  { path: 'PageNotFound', component: PageNotFoundComponent, title: 'Page Not Found' },
  { path: '', loadChildren: () => import('./Common/common.module').then(m => m.CommonMainModule),canActivate:[AuthGuard] },
  { path: '**', redirectTo:'PageNotFound', title : 'Page Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
