import { Component, OnInit } from '@angular/core';
import {Account} from '../domain/account';
import {Category} from '../domain/category';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-account-detail-form',
  templateUrl: './account-detail-form.component.html',
  styleUrls: ['./account-detail-form.component.css']
})
export class AccountDetailFormComponent implements OnInit {

  account: Account;
  category: Category;
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

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    const categoryId = +this.route.snapshot.paramMap.get('categoryId');
    console.log("Account belong to category: " + categoryId);

    this.category = new Category();
    this.category.id = categoryId;

    if(id==-1)  {
      this.operation = "Add Account: ";
      this.account = new Account();
      this.account.category = this.category;
      this.account.id = null;
      this.account.name = "";
      this.account.description = "";

    }else {
      this.operation = "Edit Account » ";
      this.getAccount();
    }
  }

  saveAccount(): void  {

        console.log("Assigned Category: " + this.account.category.id);
        console.log(JSON.stringify(this.account));
        this.http.post<Account>(environment.apiUrl + '/edit-account', this.account, httpOptions).subscribe(
          data => {
            console.log("Data from server: " + data.name);
            this.account = data;
            console.log("Posted account with id: " + this.account.id);
            this.router.navigateByUrl("account-detail/" + this.account.id);
        },
        error => {
          console.log("Could not post account, check if feeder is up.");
          this.messageService.add("Save Account: HTTP error while fetching account; check if feeder is up.");
        }
      );
  }

  getAccount(): void {

     const id = +this.route.snapshot.paramMap.get('id');
     console.log("Getting account with id: " + id);

     this.http.get<Account>(environment.apiUrl + '/get-account?id=' + id).subscribe(
       data => {

         console.log("Data from server: " + data.name);
         this.account = data;
     },
     error => {
       console.log("Could not get account, check if feeder is up.");
       this.messageService.add("Get Account: HTTP error while fetching account; check if feeder is up.");
     }
   );
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }
}
