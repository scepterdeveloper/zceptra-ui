import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; //https://www.npmjs.com/package/ngx-toastr
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule } from '@angular/common/http';

import {CategoryService} from './services/category.service';
import {MessageService} from './services/message.service';
import { MessagesComponent } from './messages/messages.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CategoryDetailFormComponent } from './category-detail-form/category-detail-form.component';
import { OrganizeComponent } from './organize/organize.component';
import { TransactComponent } from './transact/transact.component';
import { AccountDetailFormComponent } from './account-detail-form/account-detail-form.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { TransactionTypesComponent } from './transaction-types/transaction-types.component';
import { TransactionTypeDetailComponent } from './transaction-type-detail/transaction-type-detail.component';
import { TransactionTypeFormComponent } from './transaction-type-form/transaction-type-form.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportViewComponent } from './report-view/report-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    MessagesComponent,
    CategoryDetailComponent,
    DashboardComponent,
    AccountsComponent,
    CategoryDetailFormComponent,
    OrganizeComponent,
    TransactComponent,
    AnalyzeComponent,
    AccountDetailFormComponent,
    AccountDetailComponent,
    TransactionTypesComponent,
    TransactionTypeDetailComponent,
    TransactionTypeFormComponent,
    EditTransactionComponent,
    ReportFormComponent,
    ReportViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      closeButton: true      
    }),
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CategoryService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
