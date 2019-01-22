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
import { Transaction } from '../domain/transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
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

    const id = +this.route.snapshot.paramMap.get('id');
    //const transactionTypeId = +this.route.snapshot.paramMap.get('transaction-type-id');
    this.getTransactionType();

    if(id==-1)  {
      this.operation = "Create New Transaction: ";
      this.transaction = new Transaction();
      this.transaction.id = null;
      this.transaction.date = "";
      this.transaction.amount = 0;
      this.transaction.text = "";
    }else {
      this.operation = "Edit Transaction » ";
      //this.getTransaction();
    }

  }

  /*saveTransactionType(): void  {

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
  }*/

  getTransactionType(): void {

     const transactionTypeId = +this.route.snapshot.paramMap.get('transaction-type-id');
     console.log("Getting transaction type with id: " + transactionTypeId);

     this.http.get<TransactionType>(environment.apiUrl + '/get-transaction-type?id=' + transactionTypeId).subscribe(
       data => {

         console.log("Data from the server: " + data.name + " | " + data.debitAccountOrganizingEntityType);
         this.transactionType = data;
     },
     error => {
       console.log("Could not get transaction type, check if feeder is up.");
       this.messageService.add(`TransactionTypeService: HTTP error while fetching transaction type; check if feeder is up.`);
     }
   );
  }
}
