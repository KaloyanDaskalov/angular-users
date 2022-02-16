import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

import {ageRange, sexOptions} from '../../shared/config';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild('f') submitForm!:NgForm;

  ageR:number[] = ageRange ?? [];
  sexO:string [] = sexOptions ?? [];
  buttonInnerText: string = 'Create';

  constructor (private api:ApiService, private notify:NotificationService) {}

  onSubmit() {
    if (this.submitForm.valid) {
      this.api.createOne(this.submitForm.value)
      .subscribe( {
        next: () => {
        this.notify.notifications.next({message:'User is created', type:'s' } );
        this.submitForm.reset()
        },
        error: err => this.notify.notifications.next({message: err.message, type: 'd'})
      });
    }
  }
}
