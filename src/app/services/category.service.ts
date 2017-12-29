import { Injectable } from '@angular/core';
import {Category} from '../domain/category';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {

    let categories: Category[] = [];

    this.http.get<Category[]>('http://localhost:8080/get-all-categories').subscribe(data => {

      let index = 0;

      for (let category of data) {
        categories[index++] = {id: category.id, name: category.name, description: category.description};
      }
    });

    return of(categories);
  }
}
