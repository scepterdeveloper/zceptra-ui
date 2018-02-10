import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    MessagesComponent,
    CategoryDetailComponent,
    DashboardComponent,
    AccountsComponent,
    CategoryDetailFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CategoryService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
