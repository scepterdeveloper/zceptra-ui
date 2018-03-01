import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.css']
})
export class OrganizeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  viewCategories(): void  {
    this.router.navigateByUrl("/categories");
  }
}
