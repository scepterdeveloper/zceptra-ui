import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { TransactionTypeDetailComponent } from './transaction-type-detail/transaction-type-detail.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionTypesComponent } from './transaction-types/transaction-types.component';
import { OrganizeComponent } from './organize/organize.component';
import { TransactComponent } from './transact/transact.component';
import { CategoryDetailFormComponent } from './category-detail-form/category-detail-form.component';
import { AccountDetailFormComponent } from './account-detail-form/account-detail-form.component';
import { TransactionTypeFormComponent } from './transaction-type-form/transaction-type-form.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'organize', component: OrganizeComponent },
  { path: 'transact', component: TransactComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'transaction-types', component: TransactionTypesComponent },
  { path: 'category-detail/:id', component: CategoryDetailComponent },
  { path: 'transaction-type-detail/:id', component: TransactionTypeDetailComponent },
  { path: 'account-detail/:id', component: AccountDetailComponent },
  { path: 'accounts/:category-id/:category-name', component: AccountsComponent },
  { path: 'edit-category/:id', component: CategoryDetailFormComponent },
  { path: 'edit-account/:categoryId/:id', component: AccountDetailFormComponent },
  { path: 'edit-transaction-type/:id', component: TransactionTypeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
