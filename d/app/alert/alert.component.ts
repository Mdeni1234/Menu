import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { Alert, AlertType } from '../_model/alert.model';
import { Subscription } from 'rxjs';
import { AlertService } from '../_service/alert.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() id :string;
  alerts: Alert[] =[];
  subscription: Subscription;

  constructor(
    private alertService : AlertService,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() {
    // this.subscription = this.alertService.onAlert(this.id)
    // .subscribe( alert => {
    //   if (!alert.message) {
    //     this.alerts =[];
    //     return;
    //   }
    //   this.alerts.push(alert);
    // })
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  // removeAlert(alert: Alert) {
  //   this.alerts = this.alerts.filter(x => x !== alert)
  // }
  // cssClass(alert: Alert) {
  //   if (!alert) {
  //     return;
  //   }
  //   switch (alert.type) {
  //     case AlertType.Success:
  //       return 'sukses';
  //     case AlertType.Error:
  //       return 'Error';

  //   }
  // }

}
