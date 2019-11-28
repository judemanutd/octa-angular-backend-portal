import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '~app/services/auth-guard.service';

import { AppLayoutComponent as AppLayout } from '~app/components/layouts/app/app-layout.component';
// import { NoneLayoutComponent as NoneLayout } from '../components/layouts/none/none-layout.component';

import { LoginComponent } from '~app/components/pages/login/login.component';
import { TemplateComponent } from '~app/components/template/template.component';
import { UsersComponent } from '~app/components/pages/users/users.component';
import { CategoriesComponent } from '~app/components/pages/categories/categories.component';
import { TechnologiesComponent } from '~app/components/pages/technologies/technologies.component';
import { DashboardComponent } from '~app/components/pages/dashboard/dashboard.component';
import { ClientComponent } from './components/pages/client/client.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { EditProjectModalComponent } from './components/pages/projects/modals/edit-project-modal/edit-project-modal.component';

// Using child routes to handle prebuilt templates
// 2 layouts as of now App and None
// App contains the header,sidebar and footer components and auth-guard
const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  /* {
    path: '',
    component: NoneLayout,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  }, */
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuardService],
    children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
      { path: 'template', component: TemplateComponent, canActivate: [AuthGuardService] },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuardService] },
      { path: 'categories/:id', component: CategoriesComponent, canActivate: [AuthGuardService] },
      { path: 'clients', component: ClientComponent, canActivate: [AuthGuardService] },
      { path: 'technologies', component: TechnologiesComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuardService] },
      {
        path: 'projects/:id',
        component: EditProjectModalComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
