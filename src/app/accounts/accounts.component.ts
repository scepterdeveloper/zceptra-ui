import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  selectedAccount: Account;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getAccounts();
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

  getAccounts(): void {

    const categoryId = +this.route.snapshot.paramMap.get('category-id');

    console.log("Getting accounts for category " + categoryId);
    this.http.get<Account[]>('http://localhost:8080/get-accounts?categoryId=' + categoryId).subscribe(
      data => {
        console.log("Data from server: " + data.length);
        this.accounts = data;
    },
    error => {
      console.log("Could not get accounts, check if feeder is up.");
      this.messageService.add("AccountsComponent: HTTP error while fetching accounts; check if feeder is up.");
    }
   );
  }
}
