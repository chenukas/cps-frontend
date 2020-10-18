import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { ProfilesComponent } from './components/dashboard/profiles/profiles.component';
import { CreateProfileComponent } from './components/dashboard/profiles/create-profile/create-profile.component';
import { ManageProfileComponent } from './components/dashboard/profiles/manage-profile/manage-profile.component';
import { RequisitionsComponent } from './components/dashboard/requisitions/requisitions.component';
import { ManageRequisitionComponent } from './components/dashboard/requisitions/manage-requisition/manage-requisition.component';
import { ProjectsComponent } from './components/dashboard/projects/projects.component';
import { CreateProjectComponent } from './components/dashboard/projects/create-project/create-project.component';
import { ManageProjectComponent } from './components/dashboard/projects/manage-project/manage-project.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { SuppliersComponent } from './components/dashboard/suppliers/suppliers.component';
import { CreateSupplierComponent } from './components/dashboard/suppliers/create-supplier/create-supplier.component';
import { ManageSupplierComponent } from './components/dashboard/suppliers/manage-supplier/manage-supplier.component';
import { PaymentsComponent } from './components/dashboard/payments/payments.component';
import { StocksComponent } from './components/dashboard/stocks/stocks.component';
import { AddStocksComponent } from './components/dashboard/stocks/add-stocks/add-stocks.component';
import { ManageStocksComponent } from './components/dashboard/stocks/manage-stocks/manage-stocks.component';
import { ViewRequisitionComponent } from './components/dashboard/requisitions/view-requisition/view-requisition.component';

import { AuthGuard } from './auth/auth.guard';
import { ManageOrderComponent } from './components/dashboard/orders/manage-order/manage-order.component';

//Initialize all the navigation routes
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      { path: 'overview', component: OverviewComponent },
      {
        path: 'requisitions',
        component: RequisitionsComponent,
        children: [
          { path: 'manage', component: ManageRequisitionComponent },
          { path: 'view', component: ViewRequisitionComponent },
        ],
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          { path: 'create', component: CreateProjectComponent },
          { path: 'manage', component: ManageProjectComponent },
        ],
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
        children: [
          { path: 'create', component: CreateProfileComponent },
          { path: 'manage', component: ManageProfileComponent },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        children: [{ path: 'manage', component: ManageOrderComponent }],
      },
      {
        path: 'items',
        component: StocksComponent,
        children: [
          { path: 'add', component: AddStocksComponent },
          { path: 'manage', component: ManageStocksComponent },
        ],
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        children: [
          { path: 'create', component: CreateSupplierComponent },
          { path: 'manage', component: ManageSupplierComponent },
        ],
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        children: [],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
