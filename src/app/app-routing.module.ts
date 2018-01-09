import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category-detail/:id', component: CategoryDetailComponent },
  { path: 'accounts/:category-id', component: AccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
