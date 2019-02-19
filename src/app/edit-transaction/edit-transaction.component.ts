import { Component, OnInit } from '@angular/core';
import { TransactionType } from '../domain/transaction-type';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { Category } from '../domain/category';
import { Transaction } from '../domain/transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  transactionType: TransactionType;
  transaction: Transaction;

  operation: String;
  submitted = false;
  isNew = false;

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

  ngOnInit(): void {

    this.transaction = new Transaction();
    const id = +this.route.snapshot.paramMap.get('id');
    const transactionTypeId = +this.route.snapshot.paramMap.get('transaction-type-id');
    this.getTransactionType();

    if (id == -1) {
      this.isNew = true;
      this.operation = "Enter New Transaction » ";
      this.transaction.id = null;
      this.transaction.date = new Date();
      this.transaction.text = "";
      this.transaction.transactionType = this.transactionType;

    } else {
      this.isNew = false;
      this.operation = "Edit Transaction » ";
      this.getTransaction();
    }
  }

  saveTransaction(): void {

    this.transaction.transactionType = this.transactionType;
    console.log("Transaction before save: " + JSON.stringify(this.transaction));

    this.http.post<Transaction>(environment.apiUrl + '/save-transaction', this.transaction, httpOptions).subscribe(
      data => {
        console.log("Data from server: " + data.id);
        this.transaction = data;
        console.log("Posted transaction with id: " + this.transaction.id);
        console.log("Transaction after save: " + JSON.stringify(data));
        this.router.navigateByUrl("transact");
      },
      error => {
        console.log("Could not post transaction, check if feeder is up.");
        this.messageService.add(`TransactionService: HTTP error while fetching transaction; check if feeder is up.`);
      }
    );
  }

  compareAccounts(optionOne: Account, optionTwo: Account): boolean {
    console.log("---------------compareWith-----------------");
    console.log("optionOne: " + optionOne.id + " | " + optionOne.name);
    console.log("optionTwo: " + optionTwo.id + " | " + optionTwo.name);

    return optionOne.id === optionTwo.id;
  }

  getTransaction(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.http.get<Transaction>(environment.apiUrl + '/get-transaction?id=' + id).subscribe(
      data => {

        console.log("Data from the server: " + data.amount + " | " + data.text + " | " + data.account.id + " (" + data.account.name + ")");
        this.transaction = data;
      },
      error => {
        console.log("Could not get transaction, check if feeder is up.");
        this.messageService.add(`Transaction: HTTP error while fetching transaction; check if feeder is up.`);
      }
    );
  }

  getTransactionType(): void {

    const transactionTypeId = +this.route.snapshot.paramMap.get('transaction-type-id');
    console.log("Getting transaction type with id: " + transactionTypeId);

    this.http.get<TransactionType>(environment.apiUrl + '/get-transaction-type?id=' + transactionTypeId).subscribe(
      data => {

        console.log("Data from the server: " + data.name + " | " + data.debitAccountOrganizingEntityType);
        this.transactionType = data;
        if(this.isNew)  {
          //Defaulting
          this.transaction.account = this.transactionType.debitableAccounts[0];
          this.transaction.participatingAccount = this.transactionType.creditableAccounts[0];
        }
      },
      error => {
        console.log("Could not get transaction type, check if feeder is up.");
        this.messageService.add(`TransactionTypeService: HTTP error while fetching transaction type; check if feeder is up.`);
      }
    );
  }
}
