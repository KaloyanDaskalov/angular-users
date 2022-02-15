import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  
  m:string = 'This is a toast';
  isShow: boolean = true;
  type:string = 'alert-success';

  constructor() { }

  ngOnInit(): void {
  }

}
