import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AuthGuardService } from '~app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    canActivate: [AuthGuardService],
    // children: [
    //   { path: '', component: RecipeStartComponent },
    //   { path: 'new', component: RecipeEditComponent },
    //   {
    //     path: ':id',
    //     component: RecipeDetailComponent,
    //     resolve: [RecipesResolverService]
    //   },
    //   {
    //     path: ':id/edit',
    //     component: RecipeEditComponent,
    //     resolve: [RecipesResolverService]
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
