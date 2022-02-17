import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';

import { tap, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  
  m:string = '';
  isShow: boolean = false;
  type:string = '';
  sub!:Subscription;

  constructor(private notify: NotificationService) { }

  ngOnInit(): void {
    this.sub =this.notify.notifications
      .pipe(
        tap(d => {
          this.isShow = !!d.message;
          this.m = d.message;
          switch(d.type) {
            case 'd': 
              this.type = 'alert-danger' 
            break;
            case 'w': 
              this.type = 'alert-warn' 
            break;
            case 's': 
              this.type = 'alert-success' 
            break;
          }
        }),
        delay(2000)
      )
      .subscribe(data => this.isShow = false);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
