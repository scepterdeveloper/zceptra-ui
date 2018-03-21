import { Component, OnInit } from '@angular/core';
import {TransactionType} from '../domain/transaction-type';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-transaction-type-detail',
  templateUrl: './transaction-type-detail.component.html',
  styleUrls: ['./transaction-type-detail.component.css']
})
export class TransactionTypeDetailComponent implements OnInit {

  transactionType: TransactionType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.getTransactionType();
  }

  goBack(): void {
    this.router.navigateByUrl("/transaction-types");
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

  editDetails(): void {
    this.router.navigateByUrl("/edit-transaction-type/" + this.transactionType.id);
  }

  getTransactionType(): void {

     const id = +this.route.snapshot.paramMap.get('id');
     console.log("Getting TransactionType with id: " + id);

     this.http.get<TransactionType>(environment.apiUrl + '/get-transaction-type?id=' + id).subscribe(
       data => {
         console.log("Data from server: " + data.name);
         this.transactionType = data;
         console.log("After cast: " + this.transactionType.name);
     },
     error => {
       console.log("Could not get transaction type, check if feeder is up.");
       this.messageService.add(`TransactionTypeDetailComponent: HTTP error while fetching transaction type; check if feeder is up.`);
     }
   );
  }
}
