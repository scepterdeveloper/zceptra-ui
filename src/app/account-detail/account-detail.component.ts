import { Component, OnInit } from '@angular/core';
import {Account} from '../domain/account';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.getAccount();
  }

  editDetails(): void {
    this.router.navigateByUrl("/edit-account/" + this.account.category.id + "/" + this.account.id);
  }

  getAccount(): void {

     const id = +this.route.snapshot.paramMap.get('id');
     console.log("Gettig account with id: " + id);

     this.http.get<Account>(environment.apiUrl + '/get-account?id=' + id).subscribe(
       data => {
         console.log("Data from server: " + data);
         this.account = data;
     },
     error => {
       console.log("Could not get account, check if feeder is up.");
       this.messageService.add("Get Account: HTTP error while fetching account; check if feeder is up.");
     }
   );
  }

  goBack(): void {
    this.router.navigateByUrl("/accounts/" + this.account.category.id);
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

}
