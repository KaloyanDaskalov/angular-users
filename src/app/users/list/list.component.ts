import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';

import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[] =[];
  id: string | undefined;

  constructor( 
    private http: HttpClient, 
    private modalService: ModalService ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<{[key: string]: User}>('https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    .pipe(
      map(usersData => Object.entries(usersData).map(x => {
        x[1].id = x[0]
        return x[1]
      }))
    )
    .subscribe(u => this.users = u);
  }

  public onDelete = () => {
    if(this.id) {
      this.http.delete(`https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users/${this.id}.json`)
        .subscribe( _ => {
          this.fetchUsers();
        });
    }
  }

  onConfirm (id:string | undefined) {
    this.id = id;
    this.modalService.modal.next({
      title: 'Are you sure?', 
      message: 'Do you really want to delete these records? This process cannot be undone.', 
      callback: this.onDelete
    });
  }

}
