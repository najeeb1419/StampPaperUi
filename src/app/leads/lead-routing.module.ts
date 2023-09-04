import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { LeadsComponent } from './lead.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../auth/auth.guard';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {
    path: '', component: LeadsComponent,canActivate:[AuthGuard]
  },
  {

    path: 'create-lead', component: CreateLeadComponent,canActivate:[AuthGuard]
  },
  {
    path: 'add-new-task', component:AddNewTaskComponent

  },
  {
    path: 'profile', component:ProfileComponent
  },
  {
    path:'account', component:AccountComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
