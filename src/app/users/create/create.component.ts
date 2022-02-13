import { Component, OnInit } from '@angular/core';

import {ageRange, sexOptions} from '../../shared/config';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  ageR:number[] = [];
  sexO:string [] = []; 

  constructor() { 
    this.ageR = ageRange;
    this.sexO = sexOptions;
  }

  ngOnInit(): void { }

}
