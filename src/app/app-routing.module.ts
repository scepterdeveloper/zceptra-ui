import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrganizeComponent } from './organize/organize.component';
import { CategoryDetailFormComponent } from './category-detail-form/category-detail-form.component';
import { AccountDetailFormComponent } from './account-detail-form/account-detail-form.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'organize', component: OrganizeComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category-detail/:id', component: CategoryDetailComponent },
  { path: 'account-detail/:id', component: AccountDetailComponent },
  { path: 'accounts/:category-id', component: AccountsComponent },
  { path: 'edit-category/:id', component: CategoryDetailFormComponent },
  { path: 'edit-account/:categoryId/:id', component: AccountDetailFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
