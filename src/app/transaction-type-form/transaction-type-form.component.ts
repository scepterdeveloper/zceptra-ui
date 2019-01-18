import { Component, OnInit } from '@angular/core';
import {TransactionType} from '../domain/transaction-type';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import {Category} from '../domain/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-transaction-type-form',
  templateUrl: './transaction-type-form.component.html',
  styleUrls: ['./transaction-type-form.component.css']
})
export class TransactionTypeFormComponent implements OnInit {

  selectedAccounts: number[] = [2, 5, 8];
  accountsControl = new FormControl(this.selectedAccounts);
  selectedCategories: number[] = [1, 7];
  categoriesControl = new FormControl(this.selectedCategories);

  transactionType: TransactionType;
  categories: Category[];
  operation: String;
  submitted = false;
  showAccountList = false;
  showCategoryList = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit() {
    this.submitted = true;
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

  get diagnostic() { return JSON.stringify(this.transactionType); }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    if(id==-1)  {
      this.operation = "Add Transaction Type: ";
      this.transactionType = new TransactionType();
      this.transactionType.id = null;
      this.transactionType.name = "";
      this.transactionType.description = "";
      this.transactionType.debitAccountOrganizingEntityType = "CATEGORY";

    }else {
      this.operation = "Edit Transaction Type » ";
      this.getTransactionType();
    }

    this.getCategories();
  }

  saveTransactionType(): void  {

        this.http.post<TransactionType>(environment.apiUrl + '/edit-transaction-type', this.transactionType, httpOptions).subscribe(
          data => {
            console.log("Data from server: " + data.name);
            this.transactionType = data;
            console.log("Posted transaction type with id: " + this.transactionType.id);
            this.router.navigateByUrl("transaction-type-detail/" + this.transactionType.id);
        },
        error => {
          console.log("Could not post transaction type, check if feeder is up.");
          this.messageService.add(`TransactionTypeService: HTTP error while fetching transaction type; check if feeder is up.`);
        }
      );
  }

  getTransactionType(): void {

     const id = +this.route.snapshot.paramMap.get('id');
     console.log("Getting transaction type with id: " + id);

     this.http.get<TransactionType>(environment.apiUrl + '/get-transaction-type?id=' + id).subscribe(
       data => {

         console.log("Data from the server: " + data.name + " | " + data.debitAccountOrganizingEntityType);
         this.transactionType = data;
         if(data.debitAccountOrganizingEntityType == "CATEGORY") this.showCategoryList = true;
         else this.showAccountList = true;
     },
     error => {
       console.log("Could not get transaction type, check if feeder is up.");
       this.messageService.add(`TransactionTypeService: HTTP error while fetching transaction type; check if feeder is up.`);
     }
   );
  }

  getCategories(): void {
    console.log("Getting Categories from " + environment.apiUrl + '/get-all-categories');
    this.http.get<Category[]>(environment.apiUrl + '/get-all-categories').subscribe(
      data => {
        console.log("Data from server: " + data.length + " category/categories.");
        this.categories = data;
    },
    error => {
      console.log("Could not get categories, check if feeder is up.");
      this.messageService.add("CategoriesComponent: HTTP error while fetching categories; check if feeder is up.");
    }
   );
  }

  organizingEntitySetAsCategory(event: MatRadioChange) {
    console.log("Category set as organizing entity");
    this.showAccountList = false;
    this.showCategoryList = true;

  }

  organizingEntitySetAsAccount(event: MatRadioChange) {
    console.log("Account set as organizing entity");
    this.showAccountList = true;
    this.showCategoryList = false;
  }

}
