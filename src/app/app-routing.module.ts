import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/pages/login/login.component';
import { TemplateComponent } from '../components/template/template.component';
import { UsersComponent } from '../components/pages/users/users.component';
import { CategoriesComponent } from '../components/pages/categories/categories.component';
import { TechnologiesComponent } from '../components/pages/technologies/technologies.component';
import { DashboardComponent } from '../components/pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoriesComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}