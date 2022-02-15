import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/shared/interfaces';
import {ageRange, sexOptions} from '../../shared/config';

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
    private http: HttpClient,
    private route:ActivatedRoute,
    private router: Router) {
    this.buttonInnerText = 'Edit' 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.http.get<{[key: string]: User}>(`https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users/${this.id}.json`)
    .subscribe( x => this.submitForm.setValue(x) );
  }


  onSubmit() {
    if(this.submitForm.valid) {
      this.http.patch<User>(`https://users-f5135-default-rtdb.europe-west1.firebasedatabase.app/users/${this.id}.json`, this.submitForm.value)
        .subscribe(_ => {
          this.submitForm.reset();
          this.router.navigate(['/']);
        });
    }
  }
}
