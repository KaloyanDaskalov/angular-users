import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

import {ageRange, sexOptions} from '../../shared/config';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class EditComponent implements OnInit {

  buttonInnerText: string = 'Create';
  
  @ViewChild('f') submitForm!:NgForm;

  ageR:number[] = ageRange ?? [];
  sexO:string [] = sexOptions ?? [];
  id:string ='';

  constructor (
    private api: ApiService,
    private notify: NotificationService,
    private route:ActivatedRoute,
    private router: Router) {
    this.buttonInnerText = 'Edit' 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id) {
      this.api.getOne(this.id)
      .subscribe( {
        next: x => this.submitForm.setValue(x),
        error: err => {
          this.notify.notifications.next({ message: err.message, type: 'd'});
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }


  onSubmit() {
    if(this.submitForm.valid && this.id) {
      this.api.editOne(this.id, this.submitForm.value)
        .subscribe( {
          next: () => {
          this.submitForm.reset();
          this.notify.notifications.next({ message: 'User updated successful', type: 's'});
          this.router.navigate(['/']);
        },
        error: err => this.notify.notifications.next({ message: err.message, type: 'd'})
      });
    }
  }
}
