import { Component, OnInit } from '@angular/core';

import { links } from '../shared/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  l:{name:string, path: string}[] = [];
  constructor() {
    this.l = links;
  }

  ngOnInit(): void {
  }

}
