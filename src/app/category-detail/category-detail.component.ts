import { Component, OnInit} from '@angular/core';
import {Category} from '../domain/category';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  viewAccounts(): void {
    this.router.navigateByUrl("/accounts/" + this.category.id);
  }

  editDetails(): void {
    this.router.navigateByUrl("/edit-category/" + this.category.id);
  }

  getCategory(): void {

     const id = +this.route.snapshot.paramMap.get('id');
     console.log("Gettig category with id: " + id);

     this.http.get<Category>('http://localhost:8080/get-category?id=' + id).subscribe(
       data => {

         console.log("Data from server: " + data.name);
         this.category = data;
     },
     error => {
       console.log("Could not get category, check if feeder is up.");
       this.messageService.add(`CategoryService: HTTP error while fetching category; check if feeder is up.`);
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
