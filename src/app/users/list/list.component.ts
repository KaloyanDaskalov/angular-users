import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal/modal.service';

import { User } from 'src/app/shared/interfaces';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[] =[];
  id: string | undefined;

  constructor( 
    private api: ApiService, 
    private modalService: ModalService,
    private notify: NotificationService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.api.getAll()
        .subscribe( {
          next: u => this.users = u,
          error: err => this.notify.notifications.next({message: err.message, type:'d'})
        }
      )
  }

  public onDelete = () => {
    if(this.id) {
      this.api.deleteOne(this.id)
      .subscribe( {
        next: () => {
          this.notify.notifications.next({message:'User has been deleted', type:'d'});
          this.fetchUsers();
        },
        error: err => this.notify.notifications.next({message: err.message, type:'d'})
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
