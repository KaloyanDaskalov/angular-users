import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

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

  constructor (private http: HttpClient) {}

  onSubmit() {
    this.http.post<{name: string}>('https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users.json', this.submitForm.value)
      .subscribe( _ => this.submitForm.reset() );
  }
}
