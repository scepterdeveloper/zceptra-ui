import { Component, OnInit } from '@angular/core';
import {Category} from '../domain/category';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/message.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-category-detail-form',
  templateUrl: './category-detail-form.component.html',
  styleUrls: ['./category-detail-form.component.css']
})
export class CategoryDetailFormComponent implements OnInit {

  category: Category;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  onSubmit() {
    this.submitted = true;
  }

  goBack(): void {
    this.location.back();
  }  

  get diagnostic() { return JSON.stringify(this.category); }

  ngOnInit(): void {
    this.getCategory();
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
}
