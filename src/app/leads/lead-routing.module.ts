import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { LeadsComponent } from './lead.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../auth/auth.guard';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AccountComponent } from './account/account.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { MemberComponent } from './member/member.component';
import { CreateMemberComponent } from './member/create-member/create-member.component';
import { EditMemberComponent } from './member/edit-member/edit-member.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { CreateReceiptComponent } from './receipt/create-receipt/create-receipt.component';


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
  },
  {
    path:'receipt', component:ReceiptComponent,
  },
  {
    path:'member', component:MemberComponent,
  },
  {
    path:'create-member', component:CreateMemberComponent
  },
  {
    path:'edit-member', component:EditMemberComponent
  },
  {
    path:'create-account', component:CreateAccountComponent
  },
  {
    path:'edit-account', component:EditAccountComponent
  },
  {
    path:'create-receipt', component:CreateReceiptComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
