import { Component, OnInit } from '@angular/core';
import {TransactionType} from '../domain/transaction-type';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-transaction-types',
  templateUrl: './transaction-types.component.html',
  styleUrls: ['./transaction-types.component.css']
})
export class TransactionTypesComponent implements OnInit {

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

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  goBack(): void {

    this.router.navigateByUrl("/organize");
  }

  addTransactionType(): void {
    this.router.navigateByUrl("/edit-transaction-type/-1");
  }
}
