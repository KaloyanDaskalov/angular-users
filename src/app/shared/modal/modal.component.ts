import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  sub!:Subscription;
  t: string ='';
  m: string = '';
  cb!: Function;

  constructor( private  modalService: ModalService ) { }

  ngOnInit(): void {
    this.sub = this.modalService.modal.subscribe(data => {
      this.t = data.title;
      this.m = data.message;
      this.cb = data.callback;
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
