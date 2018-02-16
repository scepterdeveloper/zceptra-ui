import { Injectable } from '@angular/core';
import {Category} from '../domain/category';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getCategories(): Observable<Category[]> {

    let categories: Category[] = [];

    this.http.get<Category[]>('https://zceptra.herokuapp.com/get-all-categories').subscribe(
      data => {
        let index = 0;

        for (let category of data) {
          categories[index++] = {id: category.id, name: category.name, description: category.description};
        }
    },
    error => {
      console.log("Could not get categories, check if feeder is up.");
      this.messageService.add(`CategoryService: HTTP error while fetching categories; check if feeder is up.`);
    }
  );

  console.log("Categories Size: " + categories.length);



   return of(categories);
  }

}
