import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertModel } from '../models/alert-model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject: Subject<AlertModel|null> = new Subject<AlertModel|null>();
  public alert$: Observable<AlertModel|null> = this.alertSubject.asObservable();

  setAlert(alert: AlertModel) {
    this.alertSubject.next(alert);
  }

  clearAlert() {
    this.alertSubject.next(null); 
  }

  constructor() { }
}
