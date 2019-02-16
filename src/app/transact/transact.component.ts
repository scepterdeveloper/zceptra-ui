import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {TransactionType} from '../domain/transaction-type';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { environment } from '../../environments/environment';
import { Transaction } from '../domain/transaction';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit {

  transactionTypes: TransactionType[];
  transactions: Transaction[];
  displayedColumns: string[] = ['date', 'transactionType', 'amount', 'remarks'];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location,
    private router: Router
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


  /*viewCategories(): void  {
    this.router.navigateByUrl("/categories");
  }

  viewTransactionTypes(): void  {
    this.router.navigateByUrl("/transaction-types");
  }*/
}
