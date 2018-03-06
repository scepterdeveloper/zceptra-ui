import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import {Account} from '../domain/account';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  selectedAccount: Account;
  categoryId: number;

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

  addAccount(): void {
    this.router.navigateByUrl("/edit-account/" + this.categoryId + "/-1");
  }

  goBack(): void {
    this.router.navigateByUrl("/category-detail/" + this.categoryId);
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

  getAccounts(): void {

    this.categoryId = +this.route.snapshot.paramMap.get('category-id');

    console.log("Getting accounts for category " + this.categoryId);
    this.http.get<Account[]>(environment.apiUrl + '/get-accounts?categoryId=' + this.categoryId).subscribe(
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
