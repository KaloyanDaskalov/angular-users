import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = new BehaviorSubject({
    title: '',
    message: '',
    callback: () => {}
  });
}
