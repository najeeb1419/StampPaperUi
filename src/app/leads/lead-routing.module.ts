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
import { EditReceiptComponent } from './receipt/edit-receipt/edit-receipt.component';
import { CreateBankEmployeeComponent } from './bank-employee/create-bank-employee/create-bank-employee.component';
import { EditBankEmployeeComponent } from './bank-employee/edit-bank-employee/edit-bank-employee.component';
import { BankEmployeeComponent } from './bank-employee/bank-employee.component';
import { CreateBankEmployeeReceiptComponent } from './bank-employee-receipt/create-bank-employee-receipt/create-bank-employee-receipt.component';
import { EditBankEmployeeReceiptComponent } from './bank-employee-receipt/edit-bank-employee-receipt/edit-bank-employee-receipt.component';
import { BankEmployeeReceiptComponent } from './bank-employee-receipt/bank-employee-receipt.component';


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
  {
    path:'edit-receipt', component:EditReceiptComponent
  },
  {
    path:'create-bank-employee', component:CreateBankEmployeeComponent
  },
  {
    path:'edit-bank-employee', component:EditBankEmployeeComponent
  },
  {
    path:'bank-employee', component:BankEmployeeComponent
  },
  {
    path:'create-bank-employee-receipt', component:CreateBankEmployeeReceiptComponent
  },
  {
    path:'edit-bank-employee-receipt', component:EditBankEmployeeReceiptComponent
  },
  {
    path:'bank-employee-receipt', component:BankEmployeeReceiptComponent
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
