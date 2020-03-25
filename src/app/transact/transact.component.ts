import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {TransactionType} from '../domain/transaction-type';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { environment } from '../../environments/environment';
import { Transaction } from '../domain/transaction';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit {

  transactionTypes: TransactionType[];
  transactions: Transaction[];
  transactionsForDelete: number[]=[];
  displayedColumns: string[] = ['date', 'transactionType', 'amount', 'remarks'];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getTransactionTypes();
    this.getTransactions();
  }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  editTransaction(transaction: Transaction): void {
    console.log("Selected Transaction: " + transaction.text);
    this.router.navigateByUrl("edit-transaction/" + transaction.id +  "/" + transaction.transactionType.id);
  }

  getTransactionTypes(): void {
    console.log("Getting transaction types from " + environment.apiUrl + '/get-all-transaction-types');
    this.http.get<TransactionType[]>(environment.apiUrl + '/get-all-transaction-types').subscribe(
      data => {
        console.log("Data from server: " + data.length);
        this.transactionTypes = data;
    },
    error => {
      console.log("Could not get transaction types, check if feeder is up.");
      this.messageService.add("TransactionTypesComponent: HTTP error while fetching transaction types; check if feeder is up.");
    }
   );
  }

  getTransactions(): void {
    console.log("Getting transactions from " + environment.apiUrl + '/get-all-transactions');
    this.http.get<Transaction[]>(environment.apiUrl + '/get-all-transactions').subscribe(
      data => {
        console.log("Data from server: " + data.length);
        this.transactions = data;
        this.transactions.sort((val1, val2)=>{return val1.date < val2.date ? 1:-1});
    },
    error => {
      console.log("Could not get transactions, check if feeder is up.");
      this.messageService.add("TransactsComponent: HTTP error while fetching transactions; check if feeder is up.");
    }
   );
  }

  deleteSelected(): void  {

    this.transactions.forEach((displayedTransaction) => {
      console.log("Deletion Mark: " + displayedTransaction.id + " / " + displayedTransaction.text + " / " + displayedTransaction.markedForDelete);
      if(displayedTransaction.markedForDelete)  {
        this.transactionsForDelete.push(displayedTransaction.id);
      }
    });

    console.log(JSON.stringify(this.transactionsForDelete));

    this.http.post<number[]>(environment.apiUrl + '/delete-transactions', this.transactionsForDelete, httpOptions).subscribe(
      data => {
        console.log("Posted to Server");
        this.transactionsForDelete = [];
        this.toastr.success('Ok!', 'Transaction(s) Deleted');
        this.getTransactions();
      },
      error => {
        this.toastr.error('Oops! Something went wrong :-(', 'Delete Transaction');
        console.log("Could not delete transactions, check if feeder is up.");
        this.messageService.add(`TransactionService: HTTP error while fetching transaction; check if feeder is up.`);
      }
    );
  }
}
