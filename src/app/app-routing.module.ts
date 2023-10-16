import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './All-pages/dashboard-directory/dashboard/dashboard.component';
import { SalesComponent } from './All-pages/sales-directory/sales/sales.component';
import { CustomersComponent } from './All-pages/customers-directory/customers/customers';
import { ProjectsComponent } from './All-pages/projects-directory/projects/projects.component';
import { SubscriptionsComponent } from './All-pages/subscriptions-directory/subscriptions/subscriptions.component';
import { ContractsComponent } from './All-pages/contracts-directory/contracts/contracts.component';
import { ProductsComponent } from './All-pages/products-directory/products/products.component';
import { AccountsAndFinanceComponent } from './All-pages/accounts-&-finance-directory/accounts-and-finance/accounts-and-finance.component';
import { SupportComponent } from './All-pages/Support-directory/support/support.component';
import { ReportsComponent } from './All-pages/Reports-directory/reports/reports.component';
import { HrmModulesComponent } from './All-pages/hrm-modules-directory/hrm-modules/hrm-modules.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './All-pages/auth-directory/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'system',
        loadChildren: () =>
          import('./leads/lead.module').then((m) => m.LeadsModule),canActivate:[AuthGuard]
      },
      {
        path: 'sales',
        component: SalesComponent,canActivate:[AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,canActivate:[AuthGuard]
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
