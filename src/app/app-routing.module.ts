import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { AppLayoutComponent as AppLayout } from '../components/layouts/app/app-layout.component';
import { NoneLayoutComponent as NoneLayout } from '../components/layouts/none/none-layout.component';

import { LoginComponent } from '../components/pages/login/login.component';
import { TemplateComponent } from '../components/template/template.component';
import { UsersComponent } from '../components/pages/users/users.component';
import { CategoriesComponent } from '../components/pages/categories/categories.component';
import { TechnologiesComponent } from '../components/pages/technologies/technologies.component';
import { DashboardComponent } from '../components/pages/dashboard/dashboard.component';

// Using child routes to handle prebuilt templates
// 2 layouts as of now App and None
// App contains the header,sidebar and footer components and auth-guard
const routes: Routes = [
  {
    path: '',
    component: NoneLayout,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
      { path: 'template', component: TemplateComponent, canActivate: [AuthGuardService] },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuardService] },
      { path: 'categories/:id', component: CategoriesComponent, canActivate: [AuthGuardService] },
      { path: 'technologies', component: TechnologiesComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}