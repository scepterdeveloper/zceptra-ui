import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../domain/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  getCategories(): void {
    console.log("Getting Categories...");
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
      console.log('Categories.length: ' + this.categories.length);
  }

  ngOnInit() {
    this.getCategories();
  }
}
