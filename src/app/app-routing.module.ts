import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { SignInComponent } from './sign-in-component/sign-in-component.component';
import { AboutComponent } from './about/about.component';
import { TaskdashboardComponent } from './taskdashboard/taskdashboard.component';
const routes: Routes = [
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'tasks',
    component: TaskdashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
