import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[] =[];

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get<{[key: string]: User}>('https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users.json')
        .pipe(
          map(usersData => Object.entries(usersData).map(x => {
            x[1].id = x[0]
            return x[1]
          }))
        )
        .subscribe(u => this.users = u);
  }

  onDelete(id:string | undefined) {
    if(id) {
      this.http.delete(`https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
        .subscribe( r => console.log(r));
    }
  }

}
