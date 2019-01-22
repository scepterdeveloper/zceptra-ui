import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {TransactionType} from '../domain/transaction-type';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit {

  transactionTypes: TransactionType[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTransactionTypes();
  }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
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

  /*viewCategories(): void  {
    this.router.navigateByUrl("/categories");
  }

  viewTransactionTypes(): void  {
    this.router.navigateByUrl("/transaction-types");
  }*/
}
