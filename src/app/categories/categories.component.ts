import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../domain/category';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient,
    private messageService: MessageService,
    private location: Location,
    private router: Router
  ) { }

  goHome(): void {

    this.router.navigateByUrl("/dashboard");
  }

  goBack(): void {

    this.router.navigateByUrl("/organize");
  }

  addCategory(): void {
    this.router.navigateByUrl("/edit-category/-1");
  }

  editCategory(editedCategory: Category): void {
    this.router.navigateByUrl("/edit-category/" + editedCategory.id);
  }  

  deleteCategory(seletedCategory: Category): void {

    console.log("Not Implemented.");
  }

  showAccounts(seletedCategory: Category): void {
    this.router.navigateByUrl("/accounts/" + seletedCategory.id + "/" + seletedCategory.name);
  }

  getCategories(): void {
    console.log("Getting Categories from " + environment.apiUrl + '/get-all-categories');
    this.http.get<Category[]>(environment.apiUrl + '/get-all-categories').subscribe(
      data => {
        console.log("Data from server: " + data.length + " category/categories.");
        this.categories = data;
    },
    error => {
      console.log("Could not get categories, check if feeder is up.");
      this.messageService.add("CategoriesComponent: HTTP error while fetching categories; check if feeder is up.");
    }
   );
  }

  ngOnInit() {
    this.getCategories();
  }
}
