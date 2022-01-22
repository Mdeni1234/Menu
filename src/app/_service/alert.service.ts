import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from '../_model/alert.model';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { AlertComponent } from '../alert/alert.component';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

//   private subject = new Subject<Alert>();
//   private keepAfterRouteChange = false;
  durationInSeconds = 1
  visible: boolean;


  
  constructor(
//     private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.visible = true; 
//     this.router.events.subscribe( event => {
//       if (event instanceof NavigationStart) {
//         if (this.keepAfterRouteChange) {
//           //untuk satu alert route change
//           this.keepAfterRouteChange = false;
//         } else {
//           this.clear()
//         }
//       }
//     });
   }
    hide() { this.visible = false; }
    show() { this.visible = true; }
    toggle() { this.visible = !this.visible; }
//    onAlert(alertId?: string): Observable<Alert> {
//      return this.subject.asObservable().pipe(filter( x => 
//        x && x.alertId === alertId
//      ));
//    }
   sukses(message: string, alertId?: string){
    this._snackBar.openFromComponent(AlertComponent, {
      data: {pesan : message, id: alertId },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "end",
      verticalPosition: 'top'})

   }
   
   //   alert(alert: Alert) {
//     this.keepAfterRouteChange = alert.keepAfterRouteChange;
//     this.subject.next(alert);
//   }
//   clear(alertId?: string) {
//     this.subject.next(new Alert({ alertId}))
//   }
}
