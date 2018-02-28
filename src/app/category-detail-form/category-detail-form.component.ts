import { Component, OnInit } from '@angular/core';
import {Category} from '../domain/category';
import {CategoryService} from '../services/category.service';
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
  selector: 'app-category-detail-form',
  templateUrl: './category-detail-form.component.html',
  styleUrls: ['./category-detail-form.component.css']
})
export class CategoryDetailFormComponent implements OnInit {

  category: Category;
  operation: String;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit() {
    this.submitted = true;
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigateByUrl("/dashboard");
  }

  get diagnostic() { return JSON.stringify(this.category); }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    if(id==-1)  {
      this.operation = "Add: ";
      this.category = new Category();
      this.category.id = null;
      this.category.name = "";
      this.category.description = "";

    }else {
      this.operation = "Edit: ";
      this.getCategory();
    }
  }

  saveCategory(): void  {

        this.http.post<Category>(environment.apiUrl + '/edit-category', this.category, httpOptions).subscribe(
          data => {
            console.log("Data from server: " + data.name);
            this.category = data;
            console.log("Posted category with id: " + this.category.id);
            this.router.navigateByUrl("category-detail/" + this.category.id);
        },
        error => {
          console.log("Could not post category, check if feeder is up.");
          this.messageService.add(`CategoryService: HTTP error while fetching category; check if feeder is up.`);
        }
      );
  }

  getCategory(): void {

     const id = +this.route.snapshot.paramMap.get('id');
     console.log("Getting category with id: " + id);

     this.http.get<Category>(environment.apiUrl + '/get-category?id=' + id).subscribe(
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
