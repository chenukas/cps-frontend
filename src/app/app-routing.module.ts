import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { ProfilesComponent } from './components/dashboard/profiles/profiles.component';
import { CreateProfileComponent } from './components/dashboard/profiles/create-profile/create-profile.component';
import { ManageProfileComponent } from './components/dashboard/profiles/manage-profile/manage-profile.component';
import { RequisitionsComponent } from './components/dashboard/requisitions/requisitions.component';
import { CreateRequisitionComponent } from './components/dashboard/requisitions/create-requisition/create-requisition.component';
import { ManageRequisitionComponent } from './components/dashboard/requisitions/manage-requisition/manage-requisition.component';
import { ProjectsComponent } from './components/dashboard/projects/projects.component';
import { CreateProjectComponent } from './components/dashboard/projects/create-project/create-project.component';
import { ManageProjectComponent } from './components/dashboard/projects/manage-project/manage-project.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { ManageOrdersComponent } from './components/dashboard/orders/manage-orders/manage-orders.component';
import { SuppliersComponent } from './components/dashboard/suppliers/suppliers.component';
import { CreateSupplierComponent } from './components/dashboard/suppliers/create-supplier/create-supplier.component';
import { ManageSupplierComponent } from './components/dashboard/suppliers/manage-supplier/manage-supplier.component';
import { PaymentsComponent } from './components/dashboard/payments/payments.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      {
        path: 'requisitions',
        component: RequisitionsComponent,
        children: [
          { path: 'create', component: CreateRequisitionComponent },
          { path: 'manage', component: ManageRequisitionComponent },
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
        children: [{ path: 'manage', component: ManageOrdersComponent }],
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
