import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { LoginComponent } from './All-pages/auth-directory/login/login.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiProxyService } from './api-proxy-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SalesComponent,
    CustomersComponent,
    ProjectsComponent,
    SubscriptionsComponent,
    ContractsComponent,
    ProductsComponent,
    AccountsAndFinanceComponent,
    SupportComponent,
    ReportsComponent,
    HrmModulesComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
