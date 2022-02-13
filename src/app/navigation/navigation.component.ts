import { Component, OnInit } from '@angular/core';

import { links } from '../shared/config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  l:{name:string, path: string}[] = [];
  constructor() {
    this.l = links;
  }

  ngOnInit(): void {
  }

}
