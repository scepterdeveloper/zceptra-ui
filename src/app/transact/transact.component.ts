import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  /*viewCategories(): void  {
    this.router.navigateByUrl("/categories");
  }

  viewTransactionTypes(): void  {
    this.router.navigateByUrl("/transaction-types");
  }*/
}
