import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit() {
    console.log(this.submitForm);
  }

}
