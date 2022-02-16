import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from './shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL:string = 'https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users';

  constructor(private http:HttpClient) { }

  createURL (endPoint: string = '', query: string = '') {
    return `${this.apiURL}${endPoint}.json${query}`;
  }

  getAll (endPoint:string='', query:string = '') {
    return  this.http.get<{[key: string]: User}>(this.createURL(endPoint, query))
    .pipe(
      map(usersData => Object.entries(usersData).map(x => {
        x[1].id = x[0]
        return x[1]
      })));
  }

  createOne (userData: User) {
    return  this.http.post<{name: string}>( this.createURL(), userData);
  }

  getOne(id:string = '') {
      return this.http.get<{[key: string]: User}>(this.createURL('/'  + id))
  }

  editOne(id:string, userData: User) {
    return  this.http.patch<User>( this.createURL('/' + id), userData);
  }

  deleteOne (id:string = '') {
      return this.http.delete(this.createURL('/' + id));
  }

}
